import Express, { Application as ExpressApplication } from "express";
import * as http from "http";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import express from "express";
import { container } from "#Globals/DI/DICore.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import status from "http-status";
import { config } from "#Globals/Configs/AppConfig.js";
import { AppLogger } from "#Globals/Utils/Logger.js";
import { UserWorker } from "#Infrastructure/Queue/Workers/UserWorker.js";
import { ErrorHandlerMiddleware } from "#API/Middlewares/ErrorHandlerMiddleware.js";
import { UserController } from "#API/Controllers/UserController.js";
import { discoverPermissions } from "#Globals/Utils/DiscoverPermissions.js";
import { registerControllers } from "#Globals/Utils/RegisterControllers.js";
import { AuthController } from "#API/Controllers/AuthController.js";

const logger = AppLogger.createLogger("Server");

class Program {
  private controllers = [UserController, AuthController];
  constructor(private readonly app: ExpressApplication) {}

  public run(): void {
    try {
      this.setupSecurityMiddlewares(this.app);
      this.setupStandardMiddlewares(this.app);
      this.setupRoutesMiddlewares(this.app);
      this.setupPermissions();
      this.setupErrorHandler(this.app);
      this.setupHttpServer(this.app);
      this.setupWorkers();
    } catch (error) {
      logger.error(error, "Sd");
      process.exit(1);
    }
  }

  //--------------------------------------------------------------------------------
  private setupSecurityMiddlewares(app: ExpressApplication): void {
    app.use(
      cors({
        origin: config?.CORS_ORIGIN?.split(",") || "*",
        credentials: true,
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      }),
    );

    app.use(helmet());
    app.use(hpp());
  }

  //--------------------------------------------------------------------------------
  private setupStandardMiddlewares(app: ExpressApplication): void {
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
  }

  //--------------------------------------------------------------------------------
  private setupRoutesMiddlewares(app: ExpressApplication): void {
    registerControllers(app, this.controllers);
  }

  //--------------------------------------------------------------------------------
  private setupPermissions(): void {
    const permissions = discoverPermissions(this.controllers);
    console.log(permissions);
  }

  //--------------------------------------------------------------------------------
  private setupErrorHandler(app: ExpressApplication): void {
    app.all("/{*any}", (req, res) => {
      res.status(status.NOT_FOUND).json({ message: "Not found" });
    });

    app.use(ErrorHandlerMiddleware.handle);
  }

  //--------------------------------------------------------------------------------
  private setupHttpServer(app: ExpressApplication): http.Server {
    const httpServer = http.createServer(app);

    httpServer.listen(config.HTTP_PORT, () => {
      logger.info(`Server started on process ${process.pid}`);
      logger.info("Server running on port " + config.HTTP_PORT);
    });

    return httpServer;
  }

  private setupWorkers() {
    container.get<UserWorker>(DITypes.UserWorker);
  }
}

const program = new Program(Express());
program.run();
