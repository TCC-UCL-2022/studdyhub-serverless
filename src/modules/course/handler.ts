import { dataSource } from "../../config/database";
import { CourseController } from "./course.controller";

dataSource.initialize();

const { getAllCourses, createCourse, getCourseById, updateCourse } =
  new CourseController();

export { getAllCourses, createCourse, getCourseById, updateCourse };
