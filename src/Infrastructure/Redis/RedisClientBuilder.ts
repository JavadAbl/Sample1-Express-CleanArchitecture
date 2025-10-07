import { config } from "#Globals/Configs/AppConfig.js";
import { AppLogger } from "#Globals/Utils/Logger.js";
import { createClient } from "redis";

const logger = AppLogger.createLogger("Redis");

export class RedisClientBuilder {
  private static instance: ReturnType<typeof createClient>;
  private static isConnected = false;

  static getClient(): ReturnType<typeof createClient> {
    if (!RedisClientBuilder.instance) {
      RedisClientBuilder.instance = createClient({
        url: config.REDIS_ADDRESS,
        username: !config.isDev ? config.REDIS_USERNAME : undefined,
        password: !config.isDev ? config.REDIS_PASSWORD : undefined,
      });

      RedisClientBuilder.instance.on("error", (err: unknown) => {
        logger.error(err);
      });

      RedisClientBuilder.connect();
    }
    return RedisClientBuilder.instance;
  }

  private static async connect(): Promise<void> {
    if (!RedisClientBuilder.isConnected) {
      await RedisClientBuilder.instance.connect();
      RedisClientBuilder.isConnected = true;
    }
  }
}
