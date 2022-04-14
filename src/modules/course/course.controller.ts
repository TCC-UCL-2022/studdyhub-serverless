import { Handler } from "aws-lambda";
import { MessageUtil } from "../../common/utils";
import { CourseService } from "./course.service";

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  getAllCourses: Handler = async () => {
    try {
      const courses = await this.courseService.getAllCourses({});

      return MessageUtil.success(courses);
    } catch (err: any) {
      console.error(err);

      return MessageUtil.error(err.code, err.code, err.message);
    }
  };
}
