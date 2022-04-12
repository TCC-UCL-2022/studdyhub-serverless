import { Handler, Context } from "aws-lambda";
import dotenv from "dotenv";
import path from "path";
const dotenvPath = path.join(
  __dirname,
  "../",
  `config/.env.${process.env.NODE_ENV}`
);
dotenv.config({
  path: dotenvPath,
});

import { HealthCheck } from "./controllers";
const healthCheckController = new HealthCheck();

export const healthCheck: Handler = (...args) => {
  return healthCheckController.get(...args);
};
