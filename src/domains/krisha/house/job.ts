import { Config } from "../../config/index.js";
import Queue, { QueueOptions } from "bull";

export type QueueJobData = {
  id: number;
  text: string;
};

const redisUrl = Config.redis;

const queueOptions: QueueOptions = {
  redis: redisUrl,
};
export const queue = new Queue<QueueJobData>("QUEUE1", queueOptions);
