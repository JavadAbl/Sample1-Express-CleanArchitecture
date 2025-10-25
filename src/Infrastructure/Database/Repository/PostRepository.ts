import { inject, injectable } from "inversify";
import { Post, Prisma, PrismaClient } from "../Prisma/index.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { IPostRepository } from "#Application/Interfaces/Repository/IPostRepository.js";

@injectable()
export class PostRepository implements IPostRepository {
  constructor(@inject(DITypes.PrismaClient) private readonly prisma: PrismaClient) {}

  findOne(criteria?: Prisma.PostFindFirstArgs): Promise<Post | null> {
    return this.prisma.post.findFirst(criteria);
  }

  findMany(criteria?: Prisma.PostFindManyArgs): Promise<Post[]> {
    return this.prisma.post.findMany(criteria);
  }

  findUnique(criteria: Prisma.PostFindUniqueArgs): Promise<Post | null> {
    return this.prisma.post.findUnique(criteria);
  }

  create(data: Prisma.PostCreateArgs): Promise<Post> {
    return this.prisma.post.create(data);
  }

  update(data: Prisma.PostUpdateArgs): Promise<Post> {
    return this.prisma.post.update(data);
  }

  delete(criteria: Prisma.PostDeleteArgs): Promise<Post> {
    return this.prisma.post.delete(criteria);
  }
}
