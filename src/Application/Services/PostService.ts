import { DITypes } from "#Globals/DI/DITypes.js";
import { inject, injectable } from "inversify";
import { IPostService } from "#Application/Interfaces/Service/IPostService.js";
import { IPostRepository } from "#Application/Interfaces/Repository/IPostRepository.js";
import { IPostDto, toPostDto } from "#Application/Interfaces/Dto/Post/IPostDto.js";
import {
  IPostCreateService,
  IPostDeleteService,
  IPostFindManyService,
  IPostLikeActionService,
  IPostUpdateService,
} from "#Application/Interfaces/MethodTypes/PostMethodTypes.js";
import { IFindByIdService } from "#Application/Interfaces/MethodTypes/SharedMethodTypes.js";
import { AppError } from "#Globals/Utils/AppError.js";
import status from "http-status";
import { buildFindManyArgs } from "#Globals/Utils/PrismaUtils.js";
import { ILikeRepository } from "#Application/Interfaces/Repository/ILikeRepository.js";

@injectable()
export class PostService implements IPostService {
  constructor(
    @inject(DITypes.PostRepository) private readonly rep: IPostRepository,
    @inject(DITypes.LikeRepository) private readonly repLike: ILikeRepository,
  ) {}

  async likeAction(criteria: IPostLikeActionService): Promise<void> {
    const post = await this.rep.findUnique({ where: { id: criteria.postId }, select: { id: true, likeCount: true } });
    if (!post) throw new AppError("Post not found", status.NOT_FOUND);

    const { postId, userId } = criteria;
    const existingLike = await this.repLike.findUnique({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) await this.repLike.likeTransaction({ userId, postId, action: "dislike" });
    else await this.repLike.likeTransaction({ userId, postId, action: "like" });
  }

  async delete(criteria: IPostDeleteService): Promise<void> {
    const post = await this.rep.findUnique({ where: { id: criteria.id } });
    if (!post) throw new AppError("Post not found", status.NOT_FOUND);
    if (post.userId !== criteria.userId) throw new AppError("Unauthorized", status.UNAUTHORIZED);
    await this.rep.delete({ where: { id: criteria.id } });
    return Promise.resolve();
  }

  async update(criteria: IPostUpdateService): Promise<void> {
    const post = await this.rep.findUnique({ where: { id: criteria.id } });
    if (!post) throw new AppError("Post not found", status.NOT_FOUND);
    if (post.userId !== criteria.userId) throw new AppError("Unauthorized", status.UNAUTHORIZED);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...updateData } = criteria;
    await this.rep.update({ data: updateData, where: { id: criteria.id } });
    return Promise.resolve();
  }

  async findById(criteria: IFindByIdService): Promise<IPostDto> {
    const post = await this.rep.findUnique({ where: { id: criteria.id } });
    if (!post) throw new AppError("Post not found", status.NOT_FOUND);

    return toPostDto(post);
  }

  async findMany(criteria: IPostFindManyService): Promise<IPostDto[]> {
    const { userId, ...searchParams } = criteria;
    const args = buildFindManyArgs<"Post">(searchParams);
    const posts = await this.rep.findMany({ ...args, where: { userId } });
    return posts.map(toPostDto);
  }

  async create(criteria: IPostCreateService): Promise<IPostDto> {
    const post = await this.rep.create({ data: criteria });
    return toPostDto(post);
  }
}
