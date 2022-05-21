import { dataSource } from "../config/database";
import { TeacherController } from "../modules/teacher";

dataSource.initialize();

const controller = new TeacherController();

export const createTeacher = controller.createTeacher.bind(controller);
