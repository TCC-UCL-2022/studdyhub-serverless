import { Handler } from "aws-lambda";
import { MessageUtil } from "../../common/utils";
import { dataSource } from "../../config/database";
import { CourseService } from "./course.service";

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  getAllCourses: Handler = async () => {
    await dataSource.initialize();

    try {
      const courses = await this.courseService.getAllCourses();

      return MessageUtil.success(courses);
    } catch (err: any) {
      console.error(err);

      return MessageUtil.error(err.code, err.code, err.message);
    }
  };
}
