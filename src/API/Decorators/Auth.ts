import { AuthenticationMiddleware } from "#API/Middlewares/AuthNMiddleware.js";

export function Auth() {
  return (target: any, propertyKey: string) => {
    const existingPermissions = Reflect.getMetadata("permissions", target.constructor) || [];
    existingPermissions.push(propertyKey);
    Reflect.defineMetadata("permissions", existingPermissions, target.constructor);

    const existing = Reflect.getMetadata("middlewares", target.constructor, propertyKey) || [];
    Reflect.defineMetadata("middlewares", [...existing, AuthenticationMiddleware.handle], target.constructor, propertyKey);
  };
}
