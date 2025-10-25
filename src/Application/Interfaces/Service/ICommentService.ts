import { ICommentDto } from "../Dto/Comment/ICommentDto.js";
import {
  ICommentCreateService,
  ICommentDeleteService,
  ICommentFindManyService,
  ICommentUpdateService,
} from "../ServiceMethodTypes/CommentMethodTypes.js";
import { IFindByIdService } from "../ServiceMethodTypes/SharedMethodTypes.js";

export interface ICommentService {
  findMany(criteria: ICommentFindManyService): Promise<ICommentDto[]>;
  findById(criteria: IFindByIdService): Promise<ICommentDto>;
  create(criteria: ICommentCreateService): Promise<ICommentDto>;
  update(criteria: ICommentUpdateService): Promise<void>;
  delete(criteria: ICommentDeleteService): Promise<void>;
}
