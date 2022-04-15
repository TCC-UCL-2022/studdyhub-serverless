import { dataSource } from "./config/database";
import { CourseController, TeacherController } from "./modules";

dataSource.initialize();

const { createCourse, getAllCourses, getCourseById, updateCourse } =
  new CourseController();
const { createTeacher } = new TeacherController();

export = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  createTeacher,
};
