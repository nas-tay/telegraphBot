// import { bot } from "./index.js";
// import { Job } from "bull";
// import { HouseData, SaveHouseType } from "../../data/house/index.js";
// import { KrishaHouse } from "../krisha/house/index.js";
// import { Utils } from "../../utils/index.js";
// import { sendMessageQueueJobData, sendMessageQueue } from "../queues/sendMessageQueue/index.js";
// import { adMessageTemplate } from "../../adMessageTemplate.js";

// bot.on("text", async (ctx) => {
//   const id: string = ctx.message.text;
//   let message: string = "";
//   if (!/^\d+$/.test(id)) {
//     message = "id может состоять только из цифр";
//   } else if (id.length !== 9) {
//     message = "id может содержать только 9 символов";
//   } else {
//     const data = await HouseData.getHouse(id);
//     if (!data) {
//       const newHouse: SaveHouseType | undefined = await KrishaHouse.parseHouse(id);
//       if (!newHouse) {
//         message = "Объявление не найдено";
//       } else if (newHouse) {
//         const saved: SaveHouseType | null = await HouseData.saveHouse(newHouse);
//         if (saved) {
//           message = adMessageTemplate(saved);
//         }
//       }
//     } else {
//       message = adMessageTemplate(data);
//     }
//   }
//   sendMessageQueue.add({
//     id: ctx.chat.id,
//     text: message,
//   });
// });

// sendMessageQueue.process(async (job: Job<sendMessageQueueJobData>, done) => {
//   const user: number = job.data.id;
//   const message: string = job.data.text;
//   try {
//     await bot.telegram.sendMessage(user, message);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     await Utils.sleep(2000);
//     done();
//   }
// });
