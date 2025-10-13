import { inject, injectable } from "inversify";
import { BaseWorker } from "./BaseWorker.js";
import { UserQueue } from "../Queues/UserQueue.js";
import { UserContract, UserJobs } from "../Jobs/UserJobsContract.js";
import { UserService } from "#Application/Services/UserService.js";
import { DITypes } from "#Globals/DI/DITypes.js";

@injectable()
export class UserWorker extends BaseWorker<UserContract> {
  constructor(@inject(DITypes.UserService) userService: UserService) {
    const jobs = {
      [UserJobs.CreateUser]: (data: any) => userService.create.bind(userService)(data),
    };

    super(UserQueue.name, jobs);
  }
}
