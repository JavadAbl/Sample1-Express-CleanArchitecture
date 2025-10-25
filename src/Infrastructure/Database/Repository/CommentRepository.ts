import { inject, injectable } from "inversify";
import { Comment, Prisma, PrismaClient } from "../Prisma/index.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { ICommentRepository } from "#Application/Interfaces/Repository/ICommentRepository.js";

@injectable()
export class CommentRepository implements ICommentRepository {
  constructor(@inject(DITypes.PrismaClient) private readonly prisma: PrismaClient) {}

  findOne(criteria?: Prisma.CommentFindFirstArgs): Promise<Comment | null> {
    return this.prisma.comment.findFirst(criteria);
  }

  findMany(criteria?: Prisma.CommentFindManyArgs): Promise<Comment[]> {
    return this.prisma.comment.findMany(criteria);
  }

  findUnique(criteria: Prisma.CommentFindUniqueArgs): Promise<Comment | null> {
    return this.prisma.comment.findUnique(criteria);
  }

  create(data: Prisma.CommentCreateArgs): Promise<Comment> {
    return this.prisma.comment.create(data);
  }

  update(data: Prisma.CommentUpdateArgs): Promise<Comment> {
    return this.prisma.comment.update(data);
  }

  delete(criteria: Prisma.CommentDeleteArgs): Promise<Comment> {
    return this.prisma.comment.delete(criteria);
  }
}
