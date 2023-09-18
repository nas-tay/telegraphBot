import { Config } from "../../config/index.js";
import Queue, { QueueOptions } from "bull";

export type ParserQueueJobData = {
  city: string;
  pageNumber: number;
};

const redisUrl = Config.redis;

const parserQueueOptions: QueueOptions = {
  redis: redisUrl,
};
export const parserQueue = new Queue<ParserQueueJobData>("parser-queue", parserQueueOptions);
