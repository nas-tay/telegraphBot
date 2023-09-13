import { queue } from "./krisha/house/job.js";
import { initDatabase } from "../db/index.js";
import { HouseData } from "../data/house/index.js";
import { KrishaHouse } from "./krisha/house/index.js";
import { Telegraf } from "telegraf";
import { Config } from "./config/index.js";
import { Utils } from "../utils/index.js";
const botToken = Config.bot;
const bot = new Telegraf(botToken);
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
initDatabase();
bot.start((ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, `Здравствуйте ${ctx.from.first_name}!`);
    bot.telegram.sendMessage(ctx.chat.id, "Введите id объявления");
});
bot.on("text", async (ctx) => {
    const id = ctx.message.text;
    const data = await HouseData.getHouse(id);
    let message = "";
    if (!data) {
        const newHouse = await KrishaHouse.parseHouse(id);
        if (newHouse) {
            const saved = await HouseData.saveHouse(newHouse);
            message = createReplyMessage(saved);
        }
        else {
            message = "Объявление не найдено";
        }
    }
    else {
        message = createReplyMessage(data);
    }
    queue.add({
        id: ctx.chat.id,
        text: message,
    });
});
queue.process(async (job) => {
    const user = job.data.id;
    const message = job.data.text;
    await Utils.delay(10).then(() => {
        bot.telegram.sendMessage(user, message);
    });
});
bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
//# sourceMappingURL=index.js.map