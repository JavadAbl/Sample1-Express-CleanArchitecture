import { injectable } from "inversify";
import { BaseQueue } from "./BaseQueue.js";
import { UserContract, UserJobs } from "../Jobs/UserJobsContract.js";
import { IUserServiceResetPassword } from "#Application/Interfaces/ServiceMethodTypes/UserMethodTypes.js";

@injectable()
export class UserQueue extends BaseQueue<UserContract> {
  constructor() {
    super(UserQueue.name);
  }

  resetPasswordEmailJob(payload: IUserServiceResetPassword) {
    return this.addJob(UserJobs.ResetPasswordEmail, payload);
  }
}
