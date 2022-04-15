import { dataSource } from "../../config/database";
import { TeacherController } from "./teacher.controller";

dataSource.initialize();

const { createTeacher } = new TeacherController();

export { createTeacher };
