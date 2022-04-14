import { dataSource } from "./config/database";
import { CourseController } from "./modules";

dataSource.initialize();

const { getAllCourses } = new CourseController();

export { getAllCourses };
