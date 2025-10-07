import { createWriteStream } from "fs";
import pino from "pino";

export class AppLogger {
  constructor() {}

  static createLogger(name: string): pino.Logger {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const logStream = createWriteStream("app.log", { flags: "a" }); // 'a' for append mode
    //  const logger = pino({ level: "debug", name }, logStream);
    const logger = pino({ level: "debug", name });
    return logger;
  }
}
