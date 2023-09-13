"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const job_js_1 = require("./krisha/house/job.js");
const db_1 = require("../db");
const house_1 = require("../data/house");
const house_2 = require("./krisha/house");
const telegraf_1 = require("telegraf");
const config_1 = require("./config");
const utils_1 = require("../utils");
const botToken = config_1.Config.bot;
const bot = new telegraf_1.Telegraf(botToken);
const createReplyMessage = (data) => {
    return `
По данному id найдено объявление:

${data.roomNumber}-комнатная квартира, ${data.liveSquare} м², ${data.address}

Стоимость: ${data.price.toLocaleString("ru")} 〒
Город: ${data.city}
${data.buildingType !== "" ? "Тип Дома: " + data.buildingType + "\n" : ""}${data.yearBuilt !== 0 ? "Год постройки: " + data.yearBuilt + "\n" : ""}Этаж: ${data.floor !== 0 && data.floorMax !== 0 ? data.floor + " из " + data.floorMax : "не указан"}
Площадь: ${data.liveSquare} м²
${data.toilet !== "" ? "Санузел: " + data.toilet : ""}
`;
};
(0, db_1.initDatabase)();
bot.start((ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, `Здравствуйте ${ctx.from.first_name}!`);
    bot.telegram.sendMessage(ctx.chat.id, "Введите id объявления");
});
bot.on("text", async (ctx) => {
    const id = ctx.message.text;
    const data = await house_1.HouseData.getHouse(id);
    let message = "";
    if (!data) {
        const newHouse = await house_2.KrishaHouse.parseHouse(id);
        if (newHouse) {
            const saved = await house_1.HouseData.saveHouse(newHouse);
            message = createReplyMessage(saved);
        }
        else {
            message = "Объявление не найдено";
        }
    }
    else {
        message = createReplyMessage(data);
    }
    job_js_1.queue.add({
        id: ctx.chat.id,
        text: message,
    });
});
job_js_1.queue.process(async (job) => {
    const user = job.data.id;
    const message = job.data.text;
    await utils_1.Utils.delay(10).then(() => {
        bot.telegram.sendMessage(user, message);
    });
});
bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
//# sourceMappingURL=index.js.map