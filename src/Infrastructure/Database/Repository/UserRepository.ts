import { inject, injectable } from "inversify";
import { User, Prisma, PrismaClient } from "../Prisma/index.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { IUserRepository } from "#Application/Interfaces/Repository/IUserRepository.js";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(DITypes.PrismaClient) private readonly prisma: PrismaClient) {}

  findOne(criteria?: Prisma.UserFindFirstArgs): Promise<User | null> {
    return this.prisma.user.findFirst(criteria);
  }

  findMany(criteria?: Prisma.UserFindManyArgs): Promise<User[]> {
    return this.prisma.user.findMany(criteria);
  }

  findUnique(criteria: Prisma.UserFindUniqueArgs): Promise<User | null> {
    return this.prisma.user.findUnique(criteria);
  }

  create(data: Prisma.UserCreateArgs): Promise<User> {
    return this.prisma.user.create(data);
  }

  update(data: Prisma.UserUpdateArgs): Promise<User> {
    return this.prisma.user.update(data);
  }

  delete(criteria: Prisma.UserDeleteArgs): Promise<User> {
    return this.prisma.user.delete(criteria);
  }
}
