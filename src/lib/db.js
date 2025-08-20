// src/lib/db.js
import { Sequelize } from "sequelize";

// IMPORTANT: pg must be a dependency (not devDependency)
import pg from "pg";

const dialect = process.env.DB_DIALECT || "postgres";

// Reuse a single instance across hot reloads
let sequelize;

const buildSequelize = () => {
  const baseOptions = {
    dialect,
    // Force Sequelize to use the pg driver explicitly
    dialectModule: pg,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 20000, // a bit higher to tolerate Neon cold wake
      idle: 10000,
    },
    dialectOptions: {},
  };

  // Enable SSL for Neon/production
  if (process.env.DB_SSL === "true") {
    baseOptions.dialectOptions.ssl = {
      require: true,
      rejectUnauthorized: false,
    };
  }

  // Prefer single connection string if provided (recommended for Neon/Vercel)
  if (process.env.DATABASE_URL) {
    return new Sequelize(process.env.DATABASE_URL, baseOptions);
  }

  // Fallback to discrete env vars (useful for local dev)
  return new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      ...baseOptions,
      host: process.env.DB_HOST || "127.0.0.1",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    }
  );
};

if (!global.__sequelize) {
  global.__sequelize = buildSequelize();
}
sequelize = global.__sequelize;

export default sequelize;
