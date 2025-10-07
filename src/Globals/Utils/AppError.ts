export class AppError extends Error {
  statusCode: number;
  cause?: Error;

  constructor(message: string, statusCode: number = 500, error?: Error) {
    super(message);

    this.statusCode = statusCode;
    this.name = "AppError";
    this.cause = error;

    // Generate stack trace for AppError (skipping constructor itself)
    Error.captureStackTrace(this, AppError);

    // Merge the cause stack if provided
    if (error?.stack) {
      this.stack += `\nCaused by: ${error.stack}`;
    }
  }
}
