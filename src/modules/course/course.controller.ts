import { Handler } from "aws-lambda";
import { NotFoundError } from "../../common/errors";
import { HandlerEvent } from "../../common/types";
import { MessageUtil } from "../../common/utils";
import { CourseEntity } from "./course.entity";
import { CourseService } from "./course.service";
import { GetCoursesRequestDto } from "./dto/request";

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  getAllCourses: Handler<HandlerEvent<GetCoursesRequestDto>> = async (
    event
  ) => {
    try {
      const { items, count } = await this.courseService.getAllCourses(
        event.queryStringParameters || {}
      );

      return MessageUtil.success({ items, count });
    } catch (err) {
      return MessageUtil.error(err);
    }
  };

  getCourseById: Handler<HandlerEvent<{ id: string }>> = async (event) => {
    try {
      const { id } = event.pathParameters;

      const course = await this.courseService.getCourseById(id);

      if (!course) {
        throw new NotFoundError("Course not found");
      }

      return MessageUtil.success(course);
    } catch (err) {
      return MessageUtil.error(err);
    }
  };

  createCourse: Handler<HandlerEvent> = async (event) => {
    try {
      const payload: CourseEntity = JSON.parse(event.body);

      const course = await this.courseService.createCourse(payload);

      return MessageUtil.success(course);
    } catch (err) {
      return MessageUtil.error(err);
    }
  };

  updateCourse: Handler<HandlerEvent<{ id: string }>> = async (event) => {
    try {
      const { id } = event.pathParameters;
      const payload: Partial<CourseEntity> = JSON.parse(event.body);

      const course = await this.courseService.updateCourse(id, payload);

      if (!course) {
        throw new NotFoundError("Course not found");
      }

      return MessageUtil.success(course);
    } catch (err) {
      return MessageUtil.error(err);
    }
  };
}
