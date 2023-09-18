import { Config } from "../../config/index.js";
import Queue, { QueueOptions } from "bull";

export type sendMessageQueueJobData = {
  id: number;
  text: string;
};

const redisUrl = Config.redis;

const sendMessageQueueOptions: QueueOptions = {
  redis: redisUrl,
};
export const sendMessageQueue = new Queue<sendMessageQueueJobData>("send-message-queue", sendMessageQueueOptions);
