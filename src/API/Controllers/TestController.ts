import { Request, Response } from "express";
import { injectable } from "inversify";
import { Controller } from "#API/Decorators/Controller.js";
import { Route } from "#API/Decorators/Route.js";
import { Middlewares } from "#API/Decorators/Middlewares.js";
import { LoggerMiddleware } from "#API/Middlewares/LoggerMiddleware.js";
import status from "http-status";
import { Auth } from "#API/Decorators/Auth.js";

@Controller("/tests")
@Middlewares(LoggerMiddleware.handle)
@injectable()
export class TestController {
  constructor() {}

  @Route("get", "/test")
  @Middlewares(LoggerMiddleware.handle)
  public test(req: Request<unknown, unknown, unknown, unknown>, res: Response) {
    return res.status(status.NO_CONTENT).send();
  }
}
