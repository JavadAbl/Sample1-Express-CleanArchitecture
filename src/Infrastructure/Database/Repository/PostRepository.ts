import { inject, injectable } from "inversify";
import { Post, Prisma, PrismaClient } from "../Prisma/index.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { IPostRepository } from "#Application/Interfaces/Repository/IPostRepository.js";

@injectable()
export class PostRepository implements IPostRepository {
  constructor(@inject(DITypes.PrismaClient) private readonly prisma: PrismaClient) {}

  findOne(criteria?: Prisma.PostFindFirstArgs): Promise<Post | null> {
    throw new Error("Method not implemented.");
  }
  findMany(criteria?: Prisma.PostFindManyArgs): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
  findUnique(criteria: Prisma.PostFindUniqueArgs): Promise<Post | null> {
    throw new Error("Method not implemented.");
  }
  create(data: Prisma.PostCreateArgs): Promise<Post> {
    return this.prisma.post.create(data);
  }
  update(data: Prisma.PostUpdateArgs): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  delete(criteria: Prisma.PostDeleteArgs): Promise<Post> {
    throw new Error("Method not implemented.");
  }
}
