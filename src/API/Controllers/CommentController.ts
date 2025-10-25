import { Controller } from "#API/Decorators/Controller.js";
import { Middlewares } from "#API/Decorators/Middlewares.js";
import { Route } from "#API/Decorators/Route.js";
import { ZodValidation } from "#API/Decorators/ZodValidation.js";
import { AuthNMiddleware } from "#API/Middlewares/AuthNMiddleware.js";
import { SCommentCreate } from "#API/Schema/Comment/SCommentCreate.js";
import { ICommentCreateRequest, ICommentGetManyRequest } from "#Application/Interfaces/Request/CommentRequests.js";
import { ICommentService } from "#Application/Interfaces/Service/ICommentService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import status from "http-status";
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { SDelete } from "#API/Schema/Shared/SDelete.js";
import { SCommentGetMany } from "#API/Schema/Comment/SCommentFindMany.js";

@Controller("/Comment")
@Middlewares(AuthNMiddleware.handle)
@injectable()
export class CommentController {
  constructor(@inject(DITypes.CommentService) private readonly CommentService: ICommentService) {}

  @ZodValidation(SCommentGetMany, "query")
  @Route("get")
  public async get(req: Request<unknown, unknown, unknown, ICommentGetManyRequest>, res: Response) {
    const cms = await this.CommentService.findMany({ ...req.query, userId: req.userId });
    return res.json(cms);
  }

  @ZodValidation(SCommentCreate)
  @Route("post")
  async post(req: Request<unknown, unknown, ICommentCreateRequest>, res: Response) {
    const comment = await this.CommentService.create({ ...req.body, userId: req.userId });
    res.status(status.CREATED).json(comment);
  }

  @ZodValidation(SDelete)
  @Route("delete")
  async delete(req: Request<unknown, unknown, IDeleteRequest>, res: Response) {
    await this.CommentService.delete({ ...req.body, userId: req.userId });
    res.status(status.NO_CONTENT).send();
  }
}
