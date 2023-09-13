import { queue } from "./job.js";
import { initDatabase } from "../db/index.js";
import { HouseData } from "../data/house/index.js";
import { KrishaHouse } from "./krisha/house/index.js";
import { Telegraf } from "telegraf";
import { Config } from "./config/index.js";
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
// async function addOrUpdateJob(job: Job<QueueJobData>) {
//   // Check if a job with the user's ID already exists
//   const existingJob = await queue.getJob(job.id, job.text);
//   if (existingJob) {
//     // If the job exists, update its data
//     await existingJob.update({ userId, message });
//   } else {
//     // If the job doesn't exist, add a new job with the user's data
//     await myQueue.add({ userId, message }, { jobId: userId });
//   }
// }
initDatabase();
bot.start((ctx) => {
    ctx.reply("Здравствуйте " + ctx.from.first_name + "!");
    ctx.reply("Введите id объявления");
});
bot.on("text", async (ctx) => {
    console.log(123);
    queue.add({
        id: ctx.chat.id,
        text: ctx.message.text,
    });
});
queue.process(async (job) => {
    console.log(job);
    console.log(queue);
    const user = job.data.id;
    const id = job.data.text;
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
    bot.telegram.sendMessage(user, message);
});
bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
//# sourceMappingURL=index.js.map