import { ICommentDto, toCommentDto } from "#Application/Interfaces/Dto/Comment/ICommentDto.js";
import { ICommentRepository } from "#Application/Interfaces/Repository/ICommentRepository.js";
import { ICommentService } from "#Application/Interfaces/Service/ICommentService.js";
import {
  ICommentCreateService,
  ICommentDeleteService,
  ICommentFindManyService,
} from "#Application/Interfaces/ServiceMethodTypes/CommentMethodTypes.js";
import { IFindByIdService } from "#Application/Interfaces/ServiceMethodTypes/SharedMethodTypes.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { AppError } from "#Globals/Utils/AppError.js";
import { buildFindManyArgs } from "#Globals/Utils/PrismaUtils.js";
import status from "http-status";
import { inject, injectable } from "inversify";

@injectable()
export class CommentService implements ICommentService {
  constructor(@inject(DITypes.CommentRepository) private readonly rep: ICommentRepository) {}

  async findMany(criteria: ICommentFindManyService): Promise<ICommentDto[]> {
    const { postId, ...searchParams } = criteria;
    const args = buildFindManyArgs<"Comment">(searchParams);
    const cms = await this.rep.findMany({ ...args, where: { postId } });
    return cms.map((cm) => toCommentDto(cm));
  }

  findById(criteria: IFindByIdService): Promise<ICommentDto> {
    throw new Error("Method not implemented.");
  }

  async create(criteria: ICommentCreateService): Promise<ICommentDto> {
    const comment = await this.rep.create({ data: criteria });
    return toCommentDto(comment);
  }

  update(criteria: ICommentUpdateService): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(criteria: ICommentDeleteService): Promise<void> {
    const cm = await this.rep.findUnique({ where: { id: criteria.id }, select: { userId: true } });

    if (!cm) throw new AppError("Comment not found", status.NOT_FOUND);
    if (cm?.userId !== criteria.userId) throw new AppError("UNAUTHORIZED", status.UNAUTHORIZED);

    await this.rep.delete({ where: { id: criteria.id } });
  }
}
