// prisma.config.ts (or prisma.config.js / .cjs / .mjs as appropriate)

import "dotenv/config"; // so process.env is available

import { defineConfig } from "prisma/config";
// or, as an alternative in TS: import type { PrismaConfig } from "prisma";

export default defineConfig({
  // path to your schema
  schema: "prisma/schema.prisma",

  migrations: {
    // if you want to override where migrations go (optional)
    // path: "prisma/migrations",

    // **seed script** that Prisma will run after migrations
    seed: "node prisma/seed.js",
  },

  // If you had views or typedSql parts, you could add:
  // views: { path: "prisma/views" },
  // typedSql: { path: "prisma/queries" },

  // Optionally, enable experimental features if needed:
  // experimental: {
  //   externalTables: true,
  //   studio: true,
  //   adapter: true
  // }
});
