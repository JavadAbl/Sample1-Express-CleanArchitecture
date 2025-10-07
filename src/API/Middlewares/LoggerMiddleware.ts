export class LoggerMiddleware {
  public static handle(req: any, res: any, next: () => void) {
    console.log(`${req.method} ${req.url}`);
    next();
  }
}
