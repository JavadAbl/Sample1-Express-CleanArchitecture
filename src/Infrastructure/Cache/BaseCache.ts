import { AppLogger } from "#Globals/Utils/Logger.js";
import { RedisClientBuilder } from "#Infrastructure/Redis/RedisClientBuilder.js";

export abstract class BaseCache {
  protected client;
  protected logger;
  private readonly prefix: string;

  constructor(cacheName: string) {
    this.prefix = cacheName;
    this.logger = AppLogger.createLogger(cacheName);
    this.client = RedisClientBuilder.getClient();
  }

  private buildKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  protected async set(key: string, value: unknown, ttlSeconds?: number) {
    const redisKey = this.buildKey(key);
    try {
      const data = JSON.stringify(value);
      if (ttlSeconds) await this.client.setEx(redisKey, ttlSeconds, data);
      else await this.client.set(redisKey, data);
      this.logger.info(`Cache set for key ${redisKey}`);
    } catch (err) {
      this.logger.error(`Failed to set cache for key ${redisKey}`, err);
      throw err;
    }
  }

  protected async get<T>(key: string): Promise<T | null> {
    const redisKey = this.buildKey(key);
    try {
      const data = await this.client.get(redisKey);

      if (data) this.logger.info(`Cache hit for key ${redisKey}`);

      return data ? (JSON.parse(data) as T) : null;
    } catch (err) {
      this.logger.error(`Failed to get cache for key ${redisKey}`, err);
      throw err;
    }
  }

  protected async delete(key: string) {
    const redisKey = this.buildKey(key);
    try {
      await this.client.del(redisKey);
      this.logger.info(`Cache deleted for key ${redisKey}`);
    } catch (err) {
      this.logger.error(`Failed to delete cache for key ${redisKey}`, err);
      throw err;
    }
  }
}
