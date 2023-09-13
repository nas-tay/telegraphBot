import { Job } from "bull";
import { QueueJobData, queue } from "./domains/krisha/house/job.js";
import { initDatabase } from "./db/index.js";
import { HouseData, SaveHouseType } from "./data/house/index.js";
import { KrishaHouse } from "./domains/krisha/house/index.js";
import { Context, Telegraf } from "telegraf";
import { Config } from "./domains/config/index.js";
import { Utils } from "./utils/index.js";

const botToken = Config.bot;
const bot: Telegraf<Context> = new Telegraf(botToken);

const createReplyMessage = (data: SaveHouseType) => {
  return `
По данному id найдено объявление:

${data.roomNumber}-комнатная квартира, ${data.liveSquare} м², ${data.address}

Стоимость: ${data.price.toLocaleString("ru")} 〒
Город: ${data.city}
${data.buildingType !== "" ? "Тип Дома: " + data.buildingType + "\n" : ""}${data.yearBuilt !== 0 ? "Год постройки: " + data.yearBuilt + "\n" : ""}Этаж: ${
    data.floor !== 0 && data.floorMax !== 0 ? data.floor + " из " + data.floorMax : "не указан"
  }
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
  const id: string = ctx.message.text;
  let message: string = "";
  if (!/^\d+$/.test(id)) {
    message = "id может состоять только из цифр";
  } else if (id.length !== 9) {
    message = "id может содержать только 9 символов";
  } else {
    const data = await HouseData.getHouse(id);
    if (!data) {
      const newHouse: SaveHouseType | undefined = await KrishaHouse.parseHouse(id);
      if (newHouse) {
        const saved = await HouseData.saveHouse(newHouse);
        message = createReplyMessage(saved);
      } else {
        message = "Объявление не найдено";
      }
    } else {
      message = createReplyMessage(data);
    }
  }
  queue.add({
    id: ctx.chat.id,
    text: message,
  });
});

queue.process(async (job: Job<QueueJobData>, done) => {
  const user: number = job.data.id;
  const message: string = job.data.text;
  try {
    await bot.telegram.sendMessage(user, message);
  } catch (error) {
    console.log(error);
  } finally {
    await Utils.sleep(2000);
    done();
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
