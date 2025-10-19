import { Request, Response, NextFunction } from "express";
import { JwtUtil } from "#Globals/Utils/JwtUtils.js";
import { AppError } from "#Globals/Utils/AppError.js";
import status from "http-status";

export class AuthenticationMiddleware {
  public static async handle(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("No token provided", status.UNAUTHORIZED));
    }

    const token = authHeader.split(" ")[1];
    try {
      const payload = await JwtUtil.verifyAccessToken(token);
      (request as any).userId = payload.userId;
      next();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      next(new AppError("Invalid Token", status.UNAUTHORIZED));
    }
  }
}
