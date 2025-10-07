import { IUser } from "#Domain/Entity/IUser.js";
import { Prisma } from "#Infrastructure/Database/Prisma/index.js";

export interface IUserRepository {
  findOne(criteria?: Prisma.UserFindFirstArgs): Promise<IUser | null>;

  findMany(criteria?: Prisma.UserFindManyArgs): Promise<IUser[]>;

  findUnique(criteria: Prisma.UserFindUniqueArgs): Promise<IUser | null>;

  create(data: Prisma.UserCreateArgs): Promise<IUser>;

  update(data: Prisma.UserUpdateArgs): Promise<IUser>;

  delete(criteria: Prisma.UserDeleteArgs): Promise<IUser>;
}
