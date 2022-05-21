import { Handler } from "aws-lambda";
import { NotFoundError } from "../../common/errors";
import { HandlerEvent } from "../../common/types";
import { MessageUtil } from "../../common/utils";
import { TeacherEntity } from "./teacher.entity";
import { TeacherService } from "./teacher.service";

export class TeacherController {
  teacherService: TeacherService;

  constructor() {
    this.teacherService = new TeacherService();
  }

  getTeacherById: Handler<HandlerEvent<{ id: string }>> = async (event) => {
    try {
      const { id } = event.pathParameters;

      const teacher = await this.teacherService.getTeacherById(id);

      if (!teacher) {
        throw new NotFoundError("Teacher not found");
      }

      return MessageUtil.success(teacher);
    } catch (err) {
      return MessageUtil.error(err);
    }
  };

  createTeacher: Handler<HandlerEvent> = async (event) => {
    try {
      const payload: TeacherEntity = JSON.parse(event.body);

      const teacher = await this.teacherService.createTeacher(payload);

      return MessageUtil.success(teacher);
    } catch (err) {
      return MessageUtil.error(err);
    }
  };

  updateTeacher: Handler<HandlerEvent<{ id: string }>> = async (event) => {
    try {
      const { id } = event.pathParameters;
      const payload: Partial<TeacherEntity> = JSON.parse(event.body);

      const teacher = await this.teacherService.updateTeacher(id, payload);

      if (!teacher) {
        throw new NotFoundError("Teacher not found");
      }

      return MessageUtil.success(teacher);
    } catch (err) {
      return MessageUtil.error(err);
    }
  };
}
