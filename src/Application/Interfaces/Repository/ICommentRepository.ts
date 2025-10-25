import { Prisma, Comment } from "#Infrastructure/Database/Prisma/index.js";

export interface ICommentRepository {
  findOne(criteria?: Prisma.CommentFindFirstArgs): Promise<Comment | null>;

  findMany(criteria?: Prisma.CommentFindManyArgs): Promise<Comment[]>;

  findUnique(criteria: Prisma.CommentFindUniqueArgs): Promise<Comment | null>;

  create(data: Prisma.CommentCreateArgs): Promise<Comment>;

  update(data: Prisma.CommentUpdateArgs): Promise<Comment>;

  delete(criteria: Prisma.CommentDeleteArgs): Promise<Comment>;
}
