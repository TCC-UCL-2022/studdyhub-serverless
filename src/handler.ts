import { dataSource } from "./config/database";
import { CourseController } from "./modules";

dataSource.initialize();

const { getAllCourses, getCourseById } = new CourseController();

export { getAllCourses, getCourseById };
