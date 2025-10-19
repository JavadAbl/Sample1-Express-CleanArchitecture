import { config } from "#Globals/Configs/AppConfig.js";
import { AppLogger } from "#Globals/Utils/Logger.js";
import { Worker } from "bullmq";
import { JobContract } from "../Jobs/JobContract.js";

export type JobHandler<T> = (data: T) => Promise<any>;

export class BaseWorker<T extends JobContract<any, any>> {
  private worker!: Worker;
  private logger = AppLogger.createLogger(BaseWorker.name);

  constructor(
    private queueName: string,
    private handlers: { [K in T["jobs"]]: JobHandler<T["payloads"][K]> },
  ) {
    this.logger.info(`Starting worker for queue: ${queueName}`);
    this.setupWorker();
  }

  private setupWorker() {
    this.worker = new Worker(
      this.queueName,
      async (job) => {
        /*   console.log(1234);
        throw new Error("sdasd");
        return 1234; */

        const handler = this.handlers[job.name as T["jobs"]];
        if (!handler) {
          throw new Error(`Unknown job type: ${job.name}`);
        }
        handler(job.data);
      },
      {
        connection: {
          url: config.REDIS_ADDRESS,
          username: !config.isDev ? config.REDIS_USERNAME : undefined,
          password: !config.isDev ? config.REDIS_PASSWORD : undefined,
        },
      },
    );
  }
}
