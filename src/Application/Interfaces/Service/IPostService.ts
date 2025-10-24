import { IPostDto } from "../Dto/Post/IPostDto.js";
import { IPostCreateService } from "../ServiceMethodTypes/PostMethodTypes.js";

export interface IPostService {
  create(criteria: IPostCreateService): Promise<IPostDto>;
}
