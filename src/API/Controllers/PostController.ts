import { Request, Response } from "express";
import { Controller } from "#API/Decorators/Controller.js";
import { Route } from "#API/Decorators/Route.js";
import { ZodValidation } from "#API/Decorators/ZodValidation.js";
import { SPostCreate } from "#API/Schema/Post/SPostCreate.js";
import { IPostService } from "#Application/Interfaces/Service/IPostService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { inject, injectable } from "inversify";
import { IPostCreateRequest } from "#Application/Interfaces/Request/PostRequests.js";

@Controller("/Post")
@injectable()
export class PostController {
  constructor(@inject(DITypes.PostService) private readonly postService: IPostService) {}

  @ZodValidation(SPostCreate)
  @Route("post", "/")
  async post(req: Request<unknown, unknown, IPostCreateRequest>, res: Response) {
    await this.postService.create(req.body);
    res.status(201).send();
  }
}
