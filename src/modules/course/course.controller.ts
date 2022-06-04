import { Handler } from "aws-lambda";
import { NotFoundError } from "../../common/errors";
import { HandlerEvent } from "../../common/types";
import { Logger, MessageUtil } from "../../common/utils";
import { CourseService } from "./course.service";
import { CreateCourseDto, GetCoursesRequestDto, UpdateCourseDto } from "./dto";

export class CourseController {
  private readonly logger: Logger;

  constructor(private readonly courseService: CourseService) {
    this.logger = Logger.createLogger("CourseController");
  }

  getAllCourses: Handler<HandlerEvent<GetCoursesRequestDto>> = async (
    event
  ) => {
    this.logger.debug("[getAllCourses] invoked");

    try {
      const { items, count } = await this.courseService.getAllCourses(
        event.queryStringParameters || {}
      );

      this.logger.debug(`[getAllCourses] found: ${count} courses`);

      return MessageUtil.success({ items, count });
    } catch (err) {
      this.logger.error("[getAllCourses] failed:", err);

      return MessageUtil.error(err);
    }
  };

  getCourseById: Handler<HandlerEvent<{ id: string }>> = async (event) => {
    try {
      const { id } = event.pathParameters;

      this.logger.debug("[getCourseById] invoked for courseId:", id);

      const course = await this.courseService.getCourseById(id);

      if (!course) {
        this.logger.error("[getCourseById] course not found");
        throw new NotFoundError("Course not found");
      }

      this.logger.debug("[getCourseById] found course:", course.id);

      return MessageUtil.success(course);
    } catch (err) {
      this.logger.error("[getCourseById] failed:", err);

      return MessageUtil.error(err);
    }
  };

  createCourse: Handler<HandlerEvent<CreateCourseDto>> = async (event) => {
    this.logger.debug("[createCourse] invoked");

    try {
      const payload: CreateCourseDto = JSON.parse(event.body);

      const course = await this.courseService.createCourse(payload);

      this.logger.debug("[createCourse] created course:", course.id);

      return MessageUtil.success(course);
    } catch (err) {
      this.logger.error("[createCourse] failed:", err);

      return MessageUtil.error(err);
    }
  };

  updateCourse: Handler<HandlerEvent<{ id: string }>> = async (event) => {
    this.logger.debug("[updateCourse] invoked");

    try {
      const { id } = event.pathParameters;
      const payload: UpdateCourseDto = JSON.parse(event.body);

      const course = await this.courseService.updateCourse(id, payload);

      if (!course) {
        this.logger.error("[updateCourse] course not found");
        throw new NotFoundError("Course not found");
      }

      this.logger.debug("[updateCourse] updated course:", course.id);

      return MessageUtil.success(course);
    } catch (err) {
      this.logger.error("[updateCourse] failed:", err);

      return MessageUtil.error(err);
    }
  };

  deleteCourse: Handler<HandlerEvent<{ id: string }>> = async (event) => {
    this.logger.debug("[deleteCourse] invoked");

    try {
      const { id } = event.pathParameters;

      const course = await this.courseService.deleteCourse(id);

      if (!course) {
        this.logger.error("[deleteCourse] course not found");
        throw new NotFoundError("Course not found");
      }

      this.logger.debug("[deleteCourse] deleted course:", course.id);

      return MessageUtil.success(course);
    } catch (err) {
      this.logger.error("[deleteCourse] failed:", err);

      return MessageUtil.error(err);
    }
  };
}
