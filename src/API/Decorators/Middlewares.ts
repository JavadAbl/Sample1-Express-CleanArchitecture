import "reflect-metadata";

export type MiddlewareFunction = (req: any, res: any, next: () => void) => void;

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
