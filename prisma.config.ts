// prisma.config.ts (or prisma.config.js / .cjs / .mjs as appropriate)

import "dotenv/config";

import { defineConfig, env } from "prisma/config";
// or, as an alternative in TS: import type { PrismaConfig } from "prisma";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.js",
  },

  datasource: { url: env("DATABASE_URL") },
});
