import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

import { env } from "./env";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pgPool?: Pool;
  prismaAdapter?: PrismaPg;
};

// Robust pool configuration for Neon
const pgPool =
  globalForPrisma.pgPool ??
  new Pool({
    connectionString: env.databaseUrl,
    ssl: {
      rejectUnauthorized: false
    },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 15000, // Increased timeout to resolve previous ETIMEDOUT issues
  });

export { pgPool };

const prismaAdapter = globalForPrisma.prismaAdapter ?? new PrismaPg(pgPool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: prismaAdapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pgPool = pgPool;
  globalForPrisma.prismaAdapter = prismaAdapter;
}
