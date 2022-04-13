import { config } from "dotenv";
import { join } from "path";

config({
  path: join(__dirname, "../", `config/.env.${process.env.NODE_ENV}`),
});

const getEnvironmentVariable = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }

  return value;
};

export const environments = {
  DB_HOST: getEnvironmentVariable("DB_HOST"),
  DB_PORT: Number(getEnvironmentVariable("DB_PORT")),
  DB_NAME: getEnvironmentVariable("DB_NAME"),
  DB_USERNAME: getEnvironmentVariable("DB_USERNAME"),
  DB_PASSWORD: getEnvironmentVariable("DB_PASSWORD"),
};
