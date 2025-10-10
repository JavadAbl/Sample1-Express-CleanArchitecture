import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IUserService } from "#Application/Interfaces/Service/IUserService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import status from "http-status";
import { SUserCreate } from "#API/Schema/User/SUserCreate.js";
import { IUserCreateRequest } from "#Application/Interfaces/Request/User/IUserCreateRequest.js";
import { Controller } from "#API/Decorators/Controller.js";
import { ZodValidation } from "#API/Decorators/ZodValidation.js";
import { Route } from "#API/Decorators/Route.js";
import { SUserLogin } from "#API/Schema/User/SUserLogin.js";
import { IUserLoginRequest } from "#Application/Interfaces/Request/User/IUserLoginRequest.js";

@Controller("/Auth")
@injectable()
export class AuthController {
  constructor(@inject(DITypes.UserService) private readonly userService: IUserService) {}

  @ZodValidation(SUserCreate, "body")
  @Route("post", "/Register")
  public async register(req: Request<unknown, unknown, IUserCreateRequest, unknown>, res: Response) {
    const userDto = await this.userService.create(req.body);
    return res.status(status.CREATED).json(userDto);
  }

  @ZodValidation(SUserLogin, "body")
  @Route("post", "/Login")
  public async login(req: Request<unknown, unknown, IUserLoginRequest, unknown>, res: Response) {
    const user = await this.userService.login(req.body);
    return res.json(user);
  }
}
