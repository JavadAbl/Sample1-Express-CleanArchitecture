type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export function Route(method: HttpMethod, path: string = "/") {
  return (target: any, propertyKey: string) => {
    const routes = Reflect.getMetadata("routes", target.constructor) || [];
    routes.push({ method, path, handler: propertyKey });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
}
