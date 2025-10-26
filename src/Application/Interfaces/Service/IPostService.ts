import { IPostDto } from "../Dto/Post/IPostDto.js";
import {
  IPostCreateService,
  IPostDeleteService,
  IPostFindManyService,
  IPostLikeActionService,
  IPostUpdateService,
} from "../MethodTypes/PostMethodTypes.js";
import { IFindByIdService } from "../MethodTypes/SharedMethodTypes.js";

export interface IPostService {
  findMany(criteria: IPostFindManyService): Promise<IPostDto[]>;
  findById(criteria: IFindByIdService): Promise<IPostDto>;
  create(criteria: IPostCreateService): Promise<IPostDto>;
  update(criteria: IPostUpdateService): Promise<void>;
  delete(criteria: IPostDeleteService): Promise<void>;
  likeAction(criteria: IPostLikeActionService): Promise<void>;
}
