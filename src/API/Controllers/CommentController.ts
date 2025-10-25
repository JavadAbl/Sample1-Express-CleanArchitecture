import { Controller } from "#API/Decorators/Controller.js";
import { Middlewares } from "#API/Decorators/Middlewares.js";
import { Route } from "#API/Decorators/Route.js";
import { ZodValidation } from "#API/Decorators/ZodValidation.js";
import { AuthNMiddleware } from "#API/Middlewares/AuthNMiddleware.js";
import { SCommentCreate } from "#API/Schema/Comment/SCommentCreate.js";
import { ICommentCreateRequest } from "#Application/Interfaces/Request/CommentRequests.js";
import { ICommentService } from "#Application/Interfaces/Service/ICommentService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import status from "http-status";
import { inject, injectable } from "inversify";
import { Request, Response } from "express";

@Controller("/Comment")
@Middlewares(AuthNMiddleware.handle)
@injectable()
export class CommentController {
  constructor(@inject(DITypes.CommentService) private readonly CommentService: ICommentService) {}

  @ZodValidation(SCommentCreate)
  @Route("post")
  async post(req: Request<unknown, unknown, ICommentCreateRequest>, res: Response) {
    const comment = await this.CommentService.create({ ...req.body, userId: req.userId });
    res.status(status.CREATED).json(comment);
  }
}
