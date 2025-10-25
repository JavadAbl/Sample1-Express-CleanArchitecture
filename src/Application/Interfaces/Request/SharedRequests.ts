export type IDeleteRequest = { id: number };

export type IGetManyQueryRequest = {
  page?: string | undefined;
  limit?: string | undefined;
  sortBy?: string | undefined;
  sortOrder?: "asc" | "desc" | undefined;
  search?: string | undefined;
};

export type IGetByIdRequest = {
  id: number;
};

//---------------------------------------------------------------------
import { Prisma } from "#Infrastructure/Database/Prisma/index.js";

export interface IUserListQueryRequest extends IGetManyQueryRequest {
  /** Restrict sortBy to fields that actually exist on the User model */
  sortBy?: keyof Prisma.UserOrderByWithRelationInput;
}
