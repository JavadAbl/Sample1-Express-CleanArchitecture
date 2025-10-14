import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IUserService } from "#Application/Interfaces/Service/IUserService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import status from "http-status";
import { SUserCreate } from "#API/Schema/User/SUserCreate.js";
import { Controller } from "#API/Decorators/Controller.js";
import { ZodValidation } from "#API/Decorators/ZodValidation.js";
import { Route } from "#API/Decorators/Route.js";
import { SAuthLogin } from "#API/Schema/Auth/SAuthLogin.js";
import { SAuthRefreshToken } from "#API/Schema/Auth/SAuthRefreshToken.js";
import { SAuthResetPassword } from "#API/Schema/Auth/SAuthResetPassword.js";
import { IAuthRefreshTokenRequest, IUserLoginRequest } from "#Application/Interfaces/Request/AuthRequests.js";
import { IUserCreateRequest } from "#Application/Interfaces/Request/UserRequests.js";

@Controller("/Auth")
@injectable()
export class AuthController {
  constructor(@inject(DITypes.UserService) private readonly userService: IUserService) {}

  @ZodValidation(SUserCreate, "body")
  @Route("post", "/Register")
  public async register(req: Request<unknown, unknown, IUserCreateRequest>, res: Response) {
    const userDto = await this.userService.create(req.body);
    return res.status(status.CREATED).json(userDto);
  }

  @ZodValidation(SAuthLogin, "body")
  @Route("post", "/Login")
  public async login(req: Request<unknown, unknown, IUserLoginRequest>, res: Response) {
    const user = await this.userService.login(req.body);
    return res.json(user);
  }

  @ZodValidation(SAuthRefreshToken, "body")
  @Route("post", "/RefreshToken")
  public async refreshToken(req: Request<unknown, unknown, IAuthRefreshTokenRequest>, res: Response) {
    const tokens = await this.userService.refreshToken(req.body);
    return res.json(tokens);
  }

  @ZodValidation(SAuthResetPassword, "body")
  @Route("post", "/ResetPassword")
  public async resetPassword(req: Request<unknown, unknown, IAuthRefreshTokenRequest>, res: Response) {
    // await this.userService.resetPassword(req.body);
    console.log(req.body);

    return res.status(status.NO_CONTENT).send();
  }
}
