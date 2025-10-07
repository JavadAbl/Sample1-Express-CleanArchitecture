/* eslint-disable @typescript-eslint/no-unused-vars */
import { config } from "#Globals/Configs/AppConfig.js";
import { AppError } from "#Globals/Utils/AppError.js";
import { NextFunction, Request, Response } from "express";

export class ErrorHandlerMiddleware {
  public static handle(err: AppError, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      message: err.message || "Internal Server Error",
      stack: config.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
}
