import { Handler } from "aws-lambda";
import { config } from "dotenv";
import { join } from "path";

const dotenvPath = join(
  __dirname,
  "../",
  `config/.env.${process.env.NODE_ENV}`
);
config({
  path: dotenvPath,
});

import { HealthCheck } from "./controllers";
const healthCheckController = new HealthCheck();

export const healthCheck: Handler = (...args) => {
  return healthCheckController.get(...args);
};
