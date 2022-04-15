import { Handler } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { HandlerEvent } from "../../common/types";
import { MessageUtil } from "../../common/utils";
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
        event.queryStringParameters;

      const courses = await this.courseService.getAllCourses({
        query,
        skip,
        take,
        orderBy,
        orderDirection,
      });

      return MessageUtil.success(courses);
    } catch (err: any) {
      console.error(err);

      return MessageUtil.error(err.code, err.code, err.message);
    }
  };

  getCourseById: Handler<HandlerEvent<{ id: string }>> = async (event) => {
    try {
      const { id } = event.pathParameters;

      const course = await this.courseService.getCourseById(id);

      if (!course) {
        return MessageUtil.error(
          StatusCodes.NOT_FOUND,
          "NOT_FOUND",
          "Course not found"
        );
      }

      return MessageUtil.success(course);
    } catch (err: any) {
      console.error(err);

      return MessageUtil.error(err.code, err.code, err.message);
    }
  };
}
