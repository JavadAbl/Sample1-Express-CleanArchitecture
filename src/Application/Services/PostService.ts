import { DITypes } from "#Globals/DI/DITypes.js";
import { inject, injectable } from "inversify";

import { IPostService } from "#Application/Interfaces/Service/IPostService.js";
import { IPostRepository } from "#Application/Interfaces/Repository/IPostRepository.js";

@injectable()
export class PostService implements IPostService {
  constructor(@inject(DITypes.PostRepository) private readonly rep: IPostRepository) {}
}
