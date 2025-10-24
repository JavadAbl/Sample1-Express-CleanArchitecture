import { Request, Response } from "express";
import { Controller } from "#API/Decorators/Controller.js";
import { Route } from "#API/Decorators/Route.js";
import { ZodValidation } from "#API/Decorators/ZodValidation.js";
import { SPostCreate } from "#API/Schema/Post/SPostCreate.js";
import { IPostService } from "#Application/Interfaces/Service/IPostService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { inject, injectable } from "inversify";
import { IPostCreateRequest } from "#Application/Interfaces/Request/PostRequests.js";
import { Middlewares } from "#API/Decorators/Middlewares.js";
import { MulterMiddleware } from "#API/Middlewares/MulterMiddleware.js";
import status from "http-status";
import { AuthenticationMiddleware } from "#API/Middlewares/AuthenticationMiddleware.js";

@Controller("/Post")
@injectable()
export class PostController {
  constructor(@inject(DITypes.PostService) private readonly postService: IPostService) {}

  @Middlewares(AuthenticationMiddleware.handle, MulterMiddleware.multer.single("image"))
  @ZodValidation(SPostCreate)
  @Route("post")
  async post(req: Request<unknown, unknown, IPostCreateRequest>, res: Response) {
    const post = await this.postService.create({ ...req.body, userId: req.userId, image: req.file!.filename! });
    res.status(status.CREATED).json(post);
  }
}
