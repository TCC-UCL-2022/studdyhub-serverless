import { Handler } from "aws-lambda";
import { dataSource } from "./config/database";
import { CourseController } from "./modules";

dataSource.initialize();

const courseController = new CourseController();

export const getAllCourses: Handler = (...args) => {
  return courseController.getAllCourses(...args);
};
