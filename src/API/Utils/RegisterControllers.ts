import { MiddlewareFunction } from "#API/Decorators/Middlewares.js";
import express, { Router } from "express";

export async function registerControllers(app: express.Application, controllers: any[]) {
  for (const ctrl of controllers) {
    if (typeof ctrl !== "function") continue;

    const basePath = Reflect.getMetadata("basePath", ctrl);
    if (!basePath) continue;

    const controllerMiddlewares: MiddlewareFunction[] = Reflect.getMetadata("middlewares", ctrl) || [];
    const routes = Reflect.getMetadata("routes", ctrl) || [];

    const instance = new ctrl();
    const router = Router();

    for (const { method, path, handler, middlewares } of routes) {
      const actionMiddlewares: MiddlewareFunction[] = Reflect.getMetadata("middlewares", ctrl, handler) || [];

      // Combine and deduplicate middlewares
      const combined = [...controllerMiddlewares, ...(middlewares || []), ...actionMiddlewares];

      const unique = Array.from(new Set(combined.map((fn) => fn.toString()))).map(
        (fnStr) => combined.find((fn) => fn.toString() === fnStr)!,
      );

      (router as any)[method](path, ...unique, instance[handler].bind(instance));
    }

    app.use(basePath, router);
  }
}

/* import "reflect-metadata";
import express, { Router } from "express";

export async function registerControllers(app: express.Application, controllers: any[]) {
  for (const ControllerClass of controllers) {
    const basePath = Reflect.getMetadata("basePath", ControllerClass);
    if (!basePath) continue;

    const controllerMiddlewares = Reflect.getMetadata("middlewares", ControllerClass) || [];
    const routes = Reflect.getMetadata("routes", ControllerClass) || [];

    const instance = new ControllerClass();
    const router = Router();

    for (const { method, path, handler, middlewares = [] } of routes) {
      const actionMiddlewares = Reflect.getMetadata("middlewares", ControllerClass, handler) || [];
      const all = [...controllerMiddlewares, ...middlewares, ...actionMiddlewares];
      (router as any)[method](path, ...all, instance[handler].bind(instance));
    }

    app.use(basePath, router);
  }
}
 */
