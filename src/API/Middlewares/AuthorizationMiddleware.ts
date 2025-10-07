export class AuthorizationMiddleware {
  public static async handle(request: any, response: any, next: any) {
    // Authorization logic here
    console.log("AuthorizationMiddleware executed");
    next();
  }
}
