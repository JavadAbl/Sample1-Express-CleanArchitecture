import { DITypes } from "#Globals/DI/DITypes.js";
import { inject, injectable } from "inversify";
import { IPostService } from "#Application/Interfaces/Service/IPostService.js";
import { IPostRepository } from "#Application/Interfaces/Repository/IPostRepository.js";
import { IPostDto, toPostDto } from "#Application/Interfaces/Dto/Post/IPostDto.js";
import { IPostCreateService } from "#Application/Interfaces/ServiceMethodTypes/PostMethodTypes.js";

@injectable()
export class PostService implements IPostService {
  constructor(@inject(DITypes.PostRepository) private readonly rep: IPostRepository) {}

  async create(criteria: IPostCreateService): Promise<IPostDto> {
    const post = await this.rep.create({ data: criteria });
    return toPostDto(post);
  }
}
