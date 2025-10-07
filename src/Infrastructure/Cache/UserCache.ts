import { injectable } from "inversify";
import { BaseCache } from "./BaseCache.js";
import { IUserDto } from "#Application/Interfaces/Dto/User/IUserDto.js";

@injectable()
export class UserCache extends BaseCache {
  constructor() {
    super(UserCache.name);
  }

  addUser(payload: IUserDto) {
    this.set(`User:${payload.id}`, JSON.stringify(payload), 3600);
    this.logger.info(`User ${payload.id} added to cache`);
  }
}
