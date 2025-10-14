import "reflect-metadata";
import { Request, Response, NextFunction } from "express";

export type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => any;

export function Middlewares(...middlewares: MiddlewareFunction[]) {
  return (target: any, propertyKey?: string) => {
    if (propertyKey) {
      // method-level middleware
      const existing: MiddlewareFunction[] = Reflect.getMetadata("middlewares", target.constructor, propertyKey) || [];
      Reflect.defineMetadata("middlewares", [...existing, ...middlewares], target.constructor, propertyKey);
    } else {
      // controller-level middleware
      const existing: MiddlewareFunction[] = Reflect.getMetadata("middlewares", target) || [];
      Reflect.defineMetadata("middlewares", [...existing, ...middlewares], target);
    }
  };
}
