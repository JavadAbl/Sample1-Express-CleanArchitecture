import { DITypes } from "#Globals/DI/DITypes.js";
import { inject, injectable } from "inversify";
import { IPostService } from "#Application/Interfaces/Service/IPostService.js";
import { IPostRepository } from "#Application/Interfaces/Repository/IPostRepository.js";
import { IPostDto, toPostDto } from "#Application/Interfaces/Dto/Post/IPostDto.js";
import {
  IPostCreateService,
  IPostDeleteService,
  IPostFindManyService,
  IPostUpdateService,
} from "#Application/Interfaces/ServiceMethodTypes/PostMethodTypes.js";
import { IFindByIdService } from "#Application/Interfaces/ServiceMethodTypes/SharedMethodTypes.js";
import { AppError } from "#Globals/Utils/AppError.js";
import status from "http-status";
import { buildFindManyArgs } from "#Globals/Utils/PrismaUtils.js";

@injectable()
export class PostService implements IPostService {
  constructor(@inject(DITypes.PostRepository) private readonly rep: IPostRepository) {}

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
