import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  ActivityCompletedEntity,
  ActivityEntity,
  CourseEntity,
  SectionEntity,
  StudentCourseEntity,
  StudentEntity,
  TeacherEntity,
} from "../../modules";
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
  entities: [
    ActivityCompletedEntity,
    ActivityEntity,
    CourseEntity,
    SectionEntity,
    StudentCourseEntity,
    StudentEntity,
    TeacherEntity,
  ],
});
