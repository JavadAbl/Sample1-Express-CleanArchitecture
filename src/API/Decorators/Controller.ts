export function Controller(basePath: string) {
  return (target: any) => {
    Reflect.defineMetadata("basePath", basePath, target);
    if (!Reflect.hasMetadata("routes", target)) {
      Reflect.defineMetadata("routes", [], target);
    }
    if (!Reflect.hasMetadata("middlewares", target)) {
      Reflect.defineMetadata("middlewares", [], target);
    }
  };
}
