import { IPostDto } from "../Dto/Post/IPostDto.js";
import {
  IPostCreateService,
  IPostDeleteService,
  IPostFindManyService,
  IPostUpdateService,
} from "../ServiceMethodTypes/PostMethodTypes.js";
import { IFindByIdService } from "../ServiceMethodTypes/SharedMethodTypes.js";

export interface IPostService {
  findMany(criteria: IPostFindManyService): Promise<IPostDto[]>;
  findById(criteria: IFindByIdService): Promise<IPostDto>;
  create(criteria: IPostCreateService): Promise<IPostDto>;
  update(criteria: IPostUpdateService): Promise<void>;
  delete(criteria: IPostDeleteService): Promise<void>;
}
