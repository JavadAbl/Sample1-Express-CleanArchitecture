import { AuthenticationMiddleware } from "#API/Middlewares/AuthenticationMiddleware.js";
import { AuthorizationMiddleware } from "#API/Middlewares/AuthorizationMiddleware.js";

export function Permission() {
  return (target: any, propertyKey: string) => {
    const existingPermissions = Reflect.getMetadata("permissions", target.constructor) || [];
    existingPermissions.push(propertyKey);
    Reflect.defineMetadata("permissions", existingPermissions, target.constructor);

    const existing = Reflect.getMetadata("middlewares", target.constructor, propertyKey) || [];
    Reflect.defineMetadata(
      "middlewares",
      [...existing, AuthenticationMiddleware.handle, AuthorizationMiddleware.handle],
      target.constructor,
      propertyKey,
    );
  };
}
