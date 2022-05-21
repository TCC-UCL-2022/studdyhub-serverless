import "reflect-metadata";
import { DataSource } from "typeorm";
import { Activity } from "../../modules/activity";
import { ActivityProgress } from "../../modules/activity-progress";
import { Course } from "../../modules/course";
import { Enrollment } from "../../modules/enrollment";
import { User } from "../../modules/user";
import { environments } from "../environment";

export const dataSource = new DataSource({
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
});

dataSource.initialize();
