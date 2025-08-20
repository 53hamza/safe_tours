// src/lib/db.js
import { Sequelize } from "sequelize";

const dialect = process.env.DB_DIALECT || "postgres";

// Global caching for dev/hot-reload in Next.js
let sequelize;

const buildSequelize = () => {
  const baseOptions = {
    dialect,
    logging: false,
    pool: {
      max: 5, // small pool for serverless/local
      min: 0,
      acquire: 10000,
      idle: 10000,
    },
    dialectOptions: {},
  };

  // SSL handling
  if (process.env.DB_SSL === "true") {
    baseOptions.dialectOptions.ssl = {
      require: true,
      rejectUnauthorized: false,
    };
    // Some providers require this on connectionString too
  }

  if (process.env.DATABASE_URL) {
    return new Sequelize(process.env.DATABASE_URL, baseOptions);
  }

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
