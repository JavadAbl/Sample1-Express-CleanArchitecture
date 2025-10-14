import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IUserService } from "#Application/Interfaces/Service/IUserService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import status from "http-status";
import { SGetById } from "#API/Schema/Shared/SGetById.js";
import { SUserCreate } from "#API/Schema/User/SUserCreate.js";
import { SFindManyQuery } from "#API/Schema/Shared/SFindManyQuery.js";
import { SDelete } from "#API/Schema/Shared/SDelete.js";
import { Controller } from "#API/Decorators/Controller.js";
import { Route } from "#API/Decorators/Route.js";
import { Middlewares } from "#API/Decorators/Middlewares.js";
import { ZodValidation } from "#API/Decorators/ZodValidation.js";
import { SUserUpdate } from "#API/Schema/User/SUserUpdate.js";
import { AuthenticationMiddleware } from "#API/Middlewares/AuthenticationMiddleware.js";
import { IUserCreateRequest, IUserUpdateRequest } from "#Application/Interfaces/Request/UserRequests.js";
import { IDeleteRequest, IFindManyQueryRequest, IGetByIdRequest } from "#Application/Interfaces/Request/SharedRequests.js";

@injectable()
@Controller("/users")
@Middlewares(AuthenticationMiddleware.handle)
export class UserController {
  constructor(@inject(DITypes.UserService) private readonly userService: IUserService) {}

  /* @Route("get", "/test")
  @Middlewares(LoggerMiddleware.handle)
  public test(req: Request, res: Response) {
    console.log("2");

    return res.status(status.NO_CONTENT).send();
  } */

  @ZodValidation(SUserCreate, "body")
  @Route("post", "/")
  public async post(req: Request<unknown, unknown, IUserCreateRequest>, res: Response) {
    const userDto = await this.userService.create(req.body);
    return res.status(status.CREATED).json(userDto);
  }

  @ZodValidation(SFindManyQuery, "query")
  @Route("get", "/")
  public async get(req: Request<unknown, unknown, unknown, IFindManyQueryRequest>, res: Response) {
    const users = await this.userService.findMany(req.query);
    return res.json(users);
  }

  @ZodValidation(SGetById, "params")
  @Route("get", "/:id")
  public async getById(req: Request<IGetByIdRequest>, res: Response) {
    const user = await this.userService.findById(req.params.id);
    return res.json(user);
  }

  @ZodValidation(SUserUpdate, "body")
  @Route("put", "/")
  public async put(req: Request<unknown, unknown, IUserUpdateRequest>, res: Response) {
    await this.userService.update(req.body);
    return res.status(status.NO_CONTENT).send();
  }

  @ZodValidation(SDelete, "params")
  @Route("delete", "/:id")
  public async delete(req: Request<IDeleteRequest>, res: Response) {
    await this.userService.delete(req.params);
    return res.status(status.NO_CONTENT).send();
  }
}
