import { injectable } from "inversify";
import { BaseCache } from "./BaseCache.js";
import { IUserDto } from "#Application/Interfaces/Dto/User/IUserDto.js";

@injectable()
export class UserCache extends BaseCache {
  constructor() {
    super(UserCache.name);
  }

  addUser(payload: IUserDto) {
    this.set(String(payload.id), JSON.stringify(payload), 3600);
    this.logger.info(`User ${payload.id} added to cache`);
  }

  async getUser(id: number): Promise<IUserDto | null> {
    const data = await this.get<IUserDto>(String(id));
    this.logger.info(`User ${id} retrieved from cache`);
    return data;
  }

  async removeUser(id: number) {
    this.delete(String(id));
    this.logger.info(`User ${id} removed from cache`);
  }
}
