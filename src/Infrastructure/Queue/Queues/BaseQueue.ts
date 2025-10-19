import bullmq, { JobsOptions } from "bullmq";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";

import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { AppLogger } from "#Globals/Utils/Logger.js";
import { config } from "#Globals/Configs/AppConfig.js";
import { JobContract } from "../Jobs/JobContract.js";

const bullMQAdapters: BullMQAdapter[] = [];

export const expressAdapter = new ExpressAdapter();
expressAdapter.setBasePath("/queues");

// BaseQueue.ts
export class BaseQueue<T extends JobContract<any, any>> {
  queue: bullmq.Queue;
  logger;

  constructor(queueName: string) {
    this.queue = new bullmq.Queue(queueName, {
      connection: {
        url: config.REDIS_ADDRESS,
        username: !config.isDev ? config.REDIS_USERNAME : undefined,
        password: !config.isDev ? config.REDIS_PASSWORD : undefined,
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false,
      },
    });

    bullMQAdapters.push(new BullMQAdapter(this.queue));
    createBullBoard({ queues: bullMQAdapters, serverAdapter: expressAdapter });

    this.logger = AppLogger.createLogger(queueName);
  }

  protected addJob<K extends T["jobs"]>(name: K, data: T["payloads"][K], options?: JobsOptions) {
    this.logger.info(`Job added: ${name}`, data);
    return this.queue.add(name as string, data, {
      attempts: 3,
      backoff: { type: "exponential", delay: 1000 },
      ...options,
    });
  }
}
