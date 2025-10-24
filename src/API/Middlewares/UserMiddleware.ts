import { IUserService } from "#Application/Interfaces/Service/IUserService.js";
import { container } from "#Globals/DI/DICore.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { Request, Response, NextFunction } from "express";

export class UserMiddleware {
  static async handle(req: Request, res: Response, next: NextFunction) {
    const userService = await container.getAsync<IUserService>(DITypes.UserService);

    next();
  }
}
