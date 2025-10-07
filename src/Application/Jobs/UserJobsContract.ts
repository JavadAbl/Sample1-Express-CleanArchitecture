// UserJobsContract.ts

import { IUserCreateRequest } from "#Application/Interfaces/Request/User/IUserCreateRequest.js";
import { JobContract } from "./JobContract.js";

export enum UserJobs {
  CreateUser = "create-user",
}

export interface UserPayloads {
  [UserJobs.CreateUser]: IUserCreateRequest;
}

export type UserContract = JobContract<UserJobs, UserPayloads>;
