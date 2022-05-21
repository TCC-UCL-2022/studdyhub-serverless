import { dataSource } from "../config/database";
import { CourseController } from "../modules/course";

dataSource.initialize();

const controller = new CourseController();

export const getAllCourses = controller.getAllCourses.bind(controller);
export const createCourse = controller.createCourse.bind(controller);
export const getCourseById = controller.getCourseById.bind(controller);
export const updateCourse = controller.updateCourse.bind(controller);
