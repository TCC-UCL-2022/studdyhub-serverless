import "reflect-metadata";
import { DataSourceOptions } from "typeorm";
import {
  Activity,
  ActivityProgress,
  Course,
  Enrollment,
  User,
} from "../../entities";
import { environments } from "../environment";

export const dataSourceOptions: DataSourceOptions = {
  name: "studdyhub",
  type: "postgres",
  host: environments.DB_HOST,
  port: environments.DB_PORT,
  username: environments.DB_USERNAME,
  password: environments.DB_PASSWORD,
  database: environments.DB_NAME,
  synchronize: true,
  logger: "debug",
  entities: [ActivityProgress, Activity, Course, Enrollment, User],
};
