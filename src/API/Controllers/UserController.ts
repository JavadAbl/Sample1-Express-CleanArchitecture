import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IUserService } from "#Application/Interfaces/Service/IUserService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import status from "http-status";
import { SGetById } from "#API/Schema/Shared/SGetById.js";
import { IGetByIdRequest } from "#Application/Interfaces/Request/Shared/IGetByIdRequest.js";
import { SUserCreate } from "#API/Schema/User/SUserCreate.js";
import { SFindManyQuery } from "#API/Schema/Shared/SFindManyQuery.js";
import { IFindManyQueryRequest } from "#Application/Interfaces/Request/Shared/IFindManyQueryRequest.js";
import { IUserDto } from "#Application/Interfaces/Dto/User/IUserDto.js";
import { IDeleteRequest } from "#Application/Interfaces/Request/Shared/IDeleteRequest.js";
import { SDelete } from "#API/Schema/Shared/SDelete.js";
import { IUserCreateRequest } from "#Application/Interfaces/Request/User/IUserCreateRequest.js";
import { Controller } from "#API/Decorators/Controller.js";
import { Route } from "#API/Decorators/Route.js";
import { Middlewares } from "#API/Decorators/Middlewares.js";
import { LoggerMiddleware } from "#API/Middlewares/LoggerMiddleware.js";
import { Auth } from "#API/Decorators/Auth.js";
import { ZodValidation } from "#API/Decorators/ZodValidation.js";

@Controller("/users")
@Middlewares(LoggerMiddleware.handle)
@injectable()
export class UserController {
  constructor(@inject(DITypes.UserService) private readonly userService: IUserService) {}

  @ZodValidation(SUserCreate, "body")
  public async post(req: Request<unknown, unknown, IUserCreateRequest, unknown>, res: Response) {
    const userDto = await this.userService.create(req.body);
    return res.status(status.CREATED).json(userDto);
  }

  @ZodValidation(SFindManyQuery, "query")
  public async get(req: Request<unknown, unknown, unknown, IFindManyQueryRequest>, res: Response) {
    const users = await this.userService.findMany(req.query);
    return res.json(users);
  }

  @ZodValidation(SGetById, "params")
  public async getById(req: Request<IGetByIdRequest, unknown, unknown, unknown>, res: Response) {
    const user = await this.userService.findById(req.params.id);
    return res.json(user);
  }

  public async put(req: Request<unknown, unknown, IUserDto, unknown>, res: Response) {
    await this.userService.update(req.body);
    return res.status(status.NO_CONTENT).send();
  }

  @Auth()
  @ZodValidation(SDelete, "params")
  public async delete(req: Request<IDeleteRequest, unknown, unknown, unknown>, res: Response) {
    await this.userService.delete(req.params);
    return res.status(status.NO_CONTENT).send();
  }
  @Auth()
  @Route("get", "/test")
  @Middlewares(LoggerMiddleware.handle)
  //@Auth()
  public test(req: Request<unknown, unknown, unknown, unknown>, res: Response) {
    return res.status(status.NO_CONTENT).send();
  }
}
