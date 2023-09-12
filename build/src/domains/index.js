import { initDatabase } from "../db/index.js";
import { HouseData } from "../data/house/index.js";
import { KrishaHouse } from "./krisha/house/index.js";
import { Telegraf } from "telegraf";
import { Config } from "./config/index.js";
const botToken = Config.bot;
const bot = new Telegraf(botToken);
const id = "681426253";
const createReplyMessage = (data) => {
    return `
По данному id найдено объявление:

Стоимость: ${data.price.toLocaleString("ru")} 〒
Город: ${data.city}
${data.buildingType !== "" ? "Тип Дома: " + data.buildingType + "\n" : ""}${data.yearBuilt !== 0 ? "Год постройки: " + data.yearBuilt + "\n" : ""}Этаж: ${data.floor !== 0 && data.floorMax !== 0 ? data.floor + " из " + data.floorMax : "не указан"}
Площадь: ${data.liveSquare} м²
${data.toilet !== "" ? "Санузел: " + data.toilet : ""}
`;
};
initDatabase();
bot.start((ctx) => {
    ctx.reply("Здравствуйте " + ctx.from.first_name + "!");
    ctx.reply("Введите id объявления");
});
bot.help((ctx) => {
    ctx.reply("Send /start to receive a greeting");
    ctx.reply("Send /keyboard to receive a message with a keyboard");
    ctx.reply("Send /quit to stop the bot");
});
bot.on("text", async (ctx) => {
    const id = ctx.message?.text;
    const data = await HouseData.getHouse(id);
    let message = "";
    if (!data) {
        message = "Ищем подходящее объявление";
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
    ctx.reply(message);
});
bot.command("quit", (ctx) => {
    ctx.telegram.leaveChat(ctx.message.chat.id);
    ctx.leaveChat();
});
bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
//# sourceMappingURL=index.js.map