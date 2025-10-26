// UserJobsContract.ts

import { IUserServiceResetPassword } from "#Application/Interfaces/MethodTypes/UserMethodTypes.js";
import { JobContract } from "./JobContract.js";

export enum UserJobs {
  ResetPasswordEmail = "reset-password_email",
}

export interface UserPayloads {
  [UserJobs.ResetPasswordEmail]: IUserServiceResetPassword;
}

export type UserContract = JobContract<UserJobs, UserPayloads>;
