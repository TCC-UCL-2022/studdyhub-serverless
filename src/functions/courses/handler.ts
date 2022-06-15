import { courseController } from "../../modules/factory";

export const {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  getCoursesByUserId,
  updateCourse,
} = courseController;
