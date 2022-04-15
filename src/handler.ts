import { dataSource } from "./config/database";
import { CourseController } from "./modules";

dataSource.initialize();

const { getAllCourses, getCourseById, createCourse, updateCourse } =
  new CourseController();

export { getAllCourses, getCourseById, createCourse, updateCourse };
