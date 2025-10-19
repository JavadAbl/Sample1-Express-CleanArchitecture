import { inject, injectable } from "inversify";
import { BaseWorker } from "./BaseWorker.js";
import { UserQueue } from "../Queues/UserQueue.js";
import { UserContract, UserJobs } from "../Jobs/UserJobsContract.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { IUserService } from "#Application/Interfaces/Service/IUserService.js";

@injectable()
export class UserWorker extends BaseWorker<UserContract> {
  constructor(@inject(DITypes.UserService) userService: IUserService) {
    const jobs = {
      [UserJobs.ResetPasswordEmail]: (data: any) => userService.sendResetPasswordEmail_JobHandler.bind(userService)(data),
    };

    super(UserQueue.name, jobs);
  }
}
