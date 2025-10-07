import { Prisma } from "#Infrastructure/Database/Prisma/index.js";
import { IFindManyQueryRequest } from "./IFindManyQueryRequest.js";

export interface IUserListQueryRequest extends IFindManyQueryRequest {
  /** Restrict sortBy to fields that actually exist on the User model */
  sortBy?: keyof Prisma.UserOrderByWithRelationInput;
}
