import { ICommentDto, toCommentDto } from "#Application/Interfaces/Dto/Comment/ICommentDto.js";
import { ICommentRepository } from "#Application/Interfaces/Repository/ICommentRepository.js";
import { ICommentService } from "#Application/Interfaces/Service/ICommentService.js";
import { ICommentCreateService } from "#Application/Interfaces/ServiceMethodTypes/CommentMethodTypes.js";
import { IFindByIdService } from "#Application/Interfaces/ServiceMethodTypes/SharedMethodTypes.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { inject, injectable } from "inversify";

@injectable()
export class CommentService implements ICommentService {
  constructor(@inject(DITypes.CommentRepository) private readonly rep: ICommentRepository) {}

  findMany(criteria: ICommentFindManyService): Promise<ICommentDto[]> {
    throw new Error("Method not implemented.");
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
  delete(criteria: ICommentDeleteService): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
