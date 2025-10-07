import { DITypes } from "#Globals/DI/DITypes.js";
import { Router } from "express";
import { inject, injectable } from "inversify";
import { UserRoutes } from "./UserRoutes.js";

@injectable()
export class AppRoutes {
  private readonly path = "/api";
  private readonly router: Router;

  constructor(@inject(DITypes.UserRoutes) private readonly userRoutes: UserRoutes) {
    this.router = Router();

    this.initializeRoutes();
    this.router.use(this.path, this.router);
  }

  private initializeRoutes(): void {
    this.router.use(this.userRoutes.routes());
  }

  public routes(): Router {
    return this.router;
  }
}
