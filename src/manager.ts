import { Job } from "bull";
import { ParserQueueJobData, parserQueue } from "./domains/queues/parserQueue/index.js";
import { sendMessageQueue, sendMessageQueueJobData } from "./domains/queues/sendMessageQueue/index.js";
import { initDatabase } from "./db/index.js";
import { Utils } from "./utils/index.js";
import { getKrishaAdsIds } from "./cityParser.js";
import { getAdsViewsById } from "./getAdsViews.js";
import { createAdMessageById } from "./createAdMessageById.js";
import { Context, Telegraf } from "telegraf";
import { Config } from "./domains/config/index.js";
import UserModel from "./db/user/index.js";
import { TelegramBot } from "./domains/telegramBot/index.js";
import { SaveUserHistoryType, UserHistoryData } from "./data/userHistory/index.js";
import UserHistory from "./db/userHistory/index.js";
import { SaveUserType } from "./data/user/index.js";

const botToken = Config.bot;
export const bot: Telegraf<Context> = new Telegraf(botToken);

initDatabase();

const myBot = new TelegramBot(Config.bot);
myBot.start();

const users = await UserModel.find();
const userIDs: number[] = users.map((user) => user.id);

const startParserManager = async () => {
  while (true) {
    const numberOfJobsInQueque = await parserQueue.count();
    if (numberOfJobsInQueque === 0) {
      let city: string = "";
      for (let i = 0; i < 3; i++) {
        if (i % 3 === 0) {
          city = "almaty";
        } else if (i % 3 === 1) {
          city = "astana";
        } else if (i % 3 === 2) {
          city = "shymkent";
        }
        for (let pageNumber = 1; pageNumber <= 5; pageNumber++) {
          parserQueue.add({
            city: city,
            pageNumber: pageNumber,
          });
        }
      }
    }
  }
};

parserQueue.process(async (job: Job<ParserQueueJobData>, done) => {
  const city: string = job.data.city;
  const pageNumber: number = job.data.pageNumber;
  const adsIds: string[] = await getKrishaAdsIds(city, pageNumber);
  const adsViewsById = await getAdsViewsById(adsIds);
  const newAdsIds: string[] = [];
  try {
    for (const id of adsIds) {
      const views = adsViewsById[id];
      if (views > 10) {
        continue;
      }
      newAdsIds.push(id);
    }
    for (const newAdId of newAdsIds) {
      const message: string = await createAdMessageById(newAdId);
      for (const userID of userIDs) {
        const userHistory = await UserHistoryData.getUserHistory(userID, message);
        console.log("user history :", userHistory);
        if (userHistory && userHistory.viewed === true) {
          console.log("viewed");
          continue;
        }
        sendMessageQueue.add({
          id: userID,
          text: message,
        });
        const newUserHistory: SaveUserHistoryType = {
          userId: userID,
          adId: newAdId,
          viewed: false,
        };
        await UserHistoryData.saveUserHistory(newUserHistory);
      }
    }
  } catch (error) {
    console.log(error);
  }
  await Utils.sleep(1000);
  done();
});

sendMessageQueue.process(async (job: Job<sendMessageQueueJobData>, done) => {
  const id = job.data.id;
  const message = job.data.text;
  const adId = job.data.text.trim().split(" ")[0];
  try {
    console.log("trying to send a message");

    await bot.telegram.sendMessage(id, message);
    await UserHistory.findOneAndUpdate({ userId: id, adId: adId }, { viewed: true });
  } catch (error) {
    console.log(error);
  } finally {
    await Utils.sleep(4000);
    done();
  }
});

// parserQueue.empty();
// sendMessageQueue.empty();

startParserManager();
