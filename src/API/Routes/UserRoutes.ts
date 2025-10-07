import { UserController } from "#API/Controllers/UserController.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { Router } from "express";
import { inject, injectable } from "inversify";
import { th } from "zod/locales";

@injectable()
export class UserRoutes {
  private readonly path = "/User";
  private router: Router;

  constructor(@inject(DITypes.UserController) private readonly userController: UserController) {
    this.router = Router();
    this.router.use(this.path, this.router);
    this.initializeRoutes();
  }
  public routes(): Router {
    return this.router;
  }

  private initializeRoutes(): void {
    this.router.get("/", (req, res) => this.userController.get(req, res));
    this.router.get("/test/", (req, res) => this.userController.test(req, res));
    this.router.get("/:id", (req, res) => this.userController.getById(req, res));
    this.router.post("/", (req, res) => this.userController.post(req, res));
    this.router.put("/", (req, res) => this.userController.put(req, res));
    this.router.delete("/:id", (req, res) => this.userController.delete(req, res));
  }
}
