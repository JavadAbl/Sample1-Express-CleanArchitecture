import { Prisma, Like } from "#Infrastructure/Database/Prisma/index.js";
import { ILikeTransactionRep } from "../MethodTypes/LikeMethodTypes.js";

export interface ILikeRepository {
  findUnique(criteria: Prisma.LikeFindUniqueArgs): Promise<Like | null>;
  likeTransaction(criteria: ILikeTransactionRep): Promise<void>;
}
