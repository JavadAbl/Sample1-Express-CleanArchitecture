import { injectable } from "inversify";
import { BaseQueue } from "./BaseQueue.js";
import { UserContract, UserJobs } from "../../../Application/Jobs/UserJobsContract.js";
import { IUserCreateRequest } from "#Application/Interfaces/Request/User/IUserCreateRequest.js";

@injectable()
export class UserQueue extends BaseQueue<UserContract> {
  constructor() {
    super(UserQueue.name);
  }

  createUserJob(payload: IUserCreateRequest): void {
    this.addJob(UserJobs.CreateUser, payload);
    this.logger.info(`Job added: ${UserJobs.CreateUser}`, payload);
  }
}
