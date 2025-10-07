import { Request, Response, NextFunction } from "express";
export class AuthenticationMiddleware {
  public static async handle(request: Request, response: Response, next: NextFunction) {
    // Authentication logic here
    console.log("AuthenticationMiddleware executed");
    next();
  }
}
