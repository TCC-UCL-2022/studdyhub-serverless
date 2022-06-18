import { container } from "../../container";
import { CourseController } from "../../modules/course";

const courseController = container.resolve(CourseController);

export const {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  getCoursesByUserId,
  updateCourse,
} = courseController;
