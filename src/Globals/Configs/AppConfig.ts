import { AppError } from "#Globals/Utils/AppError.js";
import dotenv from "dotenv";
import status from "http-status";

class AppConfig {
  NODE_ENV: string;
  DATABASE_URL: string;
  HTTP_PORT: string;
  HTTP_ADDRESS: string;
  REDIS_ADDRESS: string;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
  JWT_ACCESS: string;
  JWT_REFRESH: string;
  JWT_PASSWORD: string;
  MAIL_ADDRESS: string;
  MAIL_PORT: string;
  MAIL_USER: string;
  MAIL_PASSWORD: string;

  get isDev() {
    return this.NODE_ENV === "development";
  }

  constructor() {
    dotenv.config();
    this.NODE_ENV = process.env.NODE_ENV!;
    this.DATABASE_URL = process.env.DATABASE_URL!;
    this.HTTP_PORT = process.env.HTTP_PORT!;
    this.HTTP_ADDRESS = process.env.HTTP_ADDRESS!;
    this.REDIS_ADDRESS = process.env.REDIS_ADDRESS!;
    this.REDIS_USERNAME = process.env.REDIS_USERNAME!;
    this.REDIS_PASSWORD = process.env.REDIS_PASSWORD!;
    this.JWT_ACCESS = process.env.JWT_ACCESS!;
    this.JWT_REFRESH = process.env.JWT_REFRESH!;
    this.JWT_PASSWORD = process.env.JWT_PASSWORD!;
    this.MAIL_ADDRESS = process.env.MAIL_ADDRESS!;
    this.MAIL_PORT = process.env.MAIL_PORT!;
    this.MAIL_USER = process.env.MAIL_USER!;
    this.MAIL_PASSWORD = process.env.MAIL_PASSWORD!;

    this.validateConfig();
  }

  validateConfig() {
    for (const [key, value] of Object.entries(this)) {
      if (!value) {
        throw new AppError(`Missing environment variable: ${key}`, status.INTERNAL_SERVER_ERROR);
      }
    }
  }
}

export const config = new AppConfig();
