import { Handler } from "aws-lambda";

import { CourseController } from "./modules/course";

const courseController = new CourseController();

export const getAllCourses: Handler = (...args) => {
  return courseController.getAllCourses(...args);
};
