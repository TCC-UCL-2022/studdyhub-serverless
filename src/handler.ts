import { Handler } from "aws-lambda";

import { CourseController } from "./modules";

const courseController = new CourseController();

export const getAllCourses: Handler = (...args) => {
  return courseController.getAllCourses(...args);
};
