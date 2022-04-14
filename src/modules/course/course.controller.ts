import { Handler } from "aws-lambda";
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
      const { skip, take, orderBy, orderDirection } =
        event.queryStringParameters;

      const courses = await this.courseService.getAllCourses({
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
}
