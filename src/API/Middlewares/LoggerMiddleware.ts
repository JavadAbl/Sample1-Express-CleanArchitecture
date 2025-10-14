export class LoggerMiddleware {
  public static handle(req: any, res: any, next: () => void) {
    console.log(`${req.method} ${req.url}`);
    console.log(`1`);
    return next();
    console.log(`3`);
  }
}
