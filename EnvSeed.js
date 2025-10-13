/* eslint-disable */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Get the equivalent of __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the key‑value pairs you want in the .env file
const envVariables = {
  NODE_ENV: "development",
  DATABASE_URL: "file:./app.db",
  HTTP_PORT: "3000",
  HTTP_ADDRESS: "localhost",
  REDIS_ADDRESS: "redis://localhost:6379",
  REDIS_USERNAME: "admin",
  REDIS_PASSWORD: "P@ssw0rd",
  JWT_ACCESS: "1",
  JWT_REFRESH: "2",
  MAIL_ADDRESS: "sandbox.smtp.mailtrap.io",
  MAIL_PORT: "587",
  MAIL_USER: "18c409b889973b",
  MAIL_PASSWORD: "462b3f9533ca87",
};

// Convert the object to the .env format (KEY=VALUE per line)
const envContent = Object.entries(envVariables)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n");

// Path to the .env file (creates it in the project root)
const envPath = resolve(__dirname, ".env");

// Write the file, overwriting any existing .env
writeFileSync(envPath, envContent, { encoding: "utf8" });

console.log(`✅ .env file created at ${envPath}`);
