import { injectable } from "inversify";
import { BaseCache } from "./BaseCache.js";
import { IUserDto } from "#Application/Interfaces/Dto/User/IUserDto.js";

@injectable()
export class UserCache extends BaseCache {
  constructor() {
    super(UserCache.name);
  }

  addUser(payload: IUserDto) {
    this.set(String(payload.id), payload, 3600);
  }

  getUser(id: number): Promise<IUserDto | null> {
    return this.get<IUserDto>(String(id));
  }

  removeUser(id: number) {
    this.delete(String(id));
  }
}
