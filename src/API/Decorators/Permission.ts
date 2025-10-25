import { AuthNMiddleware } from "#API/Middlewares/AuthNMiddleware.js";
import { AuthZMiddleware } from "#API/Middlewares/AuthZMiddleware.js";

export function Permission() {
  return (target: any, propertyKey: string) => {
    const existingPermissions = Reflect.getMetadata("permissions", target.constructor) || [];
    existingPermissions.push(propertyKey);
    Reflect.defineMetadata("permissions", existingPermissions, target.constructor);

    const existing = Reflect.getMetadata("middlewares", target.constructor, propertyKey) || [];
    Reflect.defineMetadata(
      "middlewares",
      [...existing, AuthNMiddleware.handle, AuthZMiddleware.handle],
      target.constructor,
      propertyKey,
    );
  };
}
