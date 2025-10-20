import { Prisma, User } from "#Infrastructure/Database/Prisma/index.js";

export interface IUserRepository {
  findOne(criteria?: Prisma.UserFindFirstArgs): Promise<User | null>;

  findMany(criteria?: Prisma.UserFindManyArgs): Promise<User[]>;

  findUnique(criteria: Prisma.UserFindUniqueArgs): Promise<User | null>;

  create(data: Prisma.UserCreateArgs): Promise<User>;

  update(data: Prisma.UserUpdateArgs): Promise<User>;

  delete(criteria: Prisma.UserDeleteArgs): Promise<User>;
}
