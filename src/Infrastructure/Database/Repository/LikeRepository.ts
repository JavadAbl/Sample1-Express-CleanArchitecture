import { inject, injectable } from "inversify";
import { Like, Prisma, PrismaClient } from "../Prisma/index.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { ILikeRepository } from "#Application/Interfaces/Repository/ILikeRepository.js";
import { ILikeTransactionRep } from "#Application/Interfaces/MethodTypes/LikeMethodTypes.js";
import { AppError } from "#Globals/Utils/AppError.js";

@injectable()
export class LikeRepository implements ILikeRepository {
  constructor(@inject(DITypes.PrismaClient) private readonly prisma: PrismaClient) {}

  async likeTransaction(criteria: ILikeTransactionRep): Promise<void> {
    const { postId, userId, action } = criteria;
    switch (action) {
      case "dislike":
        await this.prisma.$transaction([
          this.prisma.like.delete({ where: { userId_postId: { postId, userId } } }),
          this.prisma.post.update({ where: { id: postId }, data: { likeCount: { decrement: 1 } } }),
        ]);
        break;

      case "like":
        await this.prisma.$transaction([
          this.prisma.like.create({ data: { postId, userId } }),
          this.prisma.post.update({ where: { id: postId }, data: { likeCount: { increment: 1 } } }),
        ]);
        break;

      default:
        throw new AppError("Wrong action");
    }
  }

  findUnique(criteria: Prisma.LikeFindUniqueArgs): Promise<Like | null> {
    return this.prisma.like.findUnique(criteria);
  }
}
