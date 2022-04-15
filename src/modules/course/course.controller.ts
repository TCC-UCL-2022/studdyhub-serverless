import { Handler } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../common/errors";
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
      const { query, skip, take, orderBy, orderDirection } =
        event.queryStringParameters || {};

      const { items, count } = await this.courseService.getAllCourses({
        query,
        skip,
        take,
        orderBy,
        orderDirection,
      });

      return MessageUtil.success({ items, count });
    } catch (err) {
      console.error(err);

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
    } catch (err: any) {
      console.error(err);

      return MessageUtil.error(err);
    }
  };

  createCourse: Handler<HandlerEvent> = async (event) => {
    try {
      const payload = JSON.parse(event.body) as CourseEntity;

      const course = await this.courseService.createCourse(payload);

      return MessageUtil.success(course);
    } catch (err: any) {
      return MessageUtil.error(err);
    }
  };
}
