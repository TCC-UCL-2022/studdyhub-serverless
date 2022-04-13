import { Repository } from "typeorm";
import { dataSource } from "../../config/database";
import { CourseEntity } from "./course.entity";

export class CourseService {
  courseRepository: Repository<CourseEntity>;

  constructor() {
    this.courseRepository = dataSource.getRepository(CourseEntity);
  }

  public async getAllCourses(): Promise<CourseEntity[]> {
    return await this.courseRepository.find();
  }
}
