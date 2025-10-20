import { Prisma, Post } from "#Infrastructure/Database/Prisma/index.js";

export interface IPostRepository {
  findOne(criteria?: Prisma.PostFindFirstArgs): Promise<Post | null>;

  findMany(criteria?: Prisma.PostFindManyArgs): Promise<Post[]>;

  findUnique(criteria: Prisma.PostFindUniqueArgs): Promise<Post | null>;

  create(data: Prisma.PostCreateArgs): Promise<Post>;

  update(data: Prisma.PostUpdateArgs): Promise<Post>;

  delete(criteria: Prisma.PostDeleteArgs): Promise<Post>;
}
