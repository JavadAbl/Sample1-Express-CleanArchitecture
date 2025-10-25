import { Request, Response } from "express";
import { Controller } from "#API/Decorators/Controller.js";
import { Route } from "#API/Decorators/Route.js";
import { ZodValidation } from "#API/Decorators/ZodValidation.js";
import { SPostCreate } from "#API/Schema/Post/SPostCreate.js";
import { IPostService } from "#Application/Interfaces/Service/IPostService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { inject, injectable } from "inversify";
import {
  IPostCreateRequest,
  IPostDeleteRequest,
  IPostFindManyRequest,
  IPostUpdateRequest,
} from "#Application/Interfaces/Request/PostRequests.js";
import { Middlewares } from "#API/Decorators/Middlewares.js";
import { MulterMiddleware } from "#API/Middlewares/MulterMiddleware.js";
import status from "http-status";
import { SFindManyQuery } from "#API/Schema/Shared/SFindManyQuery.js";
import { SGetById } from "#API/Schema/Shared/SGetById.js";
import { IGetByIdRequest, IGetManyQueryRequest } from "#Application/Interfaces/Request/SharedRequests.js";
import { AuthNMiddleware } from "#API/Middlewares/AuthNMiddleware.js";
import { SPostUpdate } from "#API/Schema/Post/SPostUpdate.js";
import { SDelete } from "#API/Schema/Shared/SDelete.js";

@Controller("/Post")
@Middlewares(AuthNMiddleware.handle)
@injectable()
export class PostController {
  constructor(@inject(DITypes.PostService) private readonly postService: IPostService) {}

  @ZodValidation(SFindManyQuery, "query")
  @Route("get")
  public async get(req: Request<unknown, unknown, unknown, IGetManyQueryRequest>, res: Response) {
    const posts = await this.postService.findMany({ ...req.query, userId: req.userId });
    return res.json(posts);
  }

  @ZodValidation(SGetById, "params")
  @Route("get", "/:id")
  public async getById(req: Request<IGetByIdRequest>, res: Response) {
    const post = await this.postService.findById(req.params);
    return res.json(post);
  }

  @Middlewares(MulterMiddleware.multer.single("image"))
  @ZodValidation(SPostCreate)
  @Route("post")
  async post(req: Request<unknown, unknown, IPostCreateRequest>, res: Response) {
    const post = await this.postService.create({ ...req.body, userId: req.userId, image: req.file!.filename! });
    res.status(status.CREATED).json(post);
  }

  @ZodValidation(SPostUpdate)
  @Route("put")
  async put(req: Request<unknown, unknown, IPostUpdateRequest>, res: Response) {
    await this.postService.update({ ...req.body, userId: req.userId });
    res.status(status.NO_CONTENT).send();
  }

  @ZodValidation(SDelete)
  @Route("delete")
  async delete(req: Request<unknown, unknown, IPostDeleteRequest>, res: Response) {
    await this.postService.delete({ ...req.body, userId: req.userId });
    res.status(status.NO_CONTENT).send();
  }
}
