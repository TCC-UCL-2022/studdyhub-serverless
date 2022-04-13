import { dataSource } from "src/config/database";
import { Repository } from "typeorm";
import { CourseEntity } from "./course.entity";

export class CourseService {
  private courseRepository: Repository<CourseEntity>;

  constructor() {
    this.courseRepository = dataSource.getRepository(CourseEntity);
  }

  public async getAllCourses(): Promise<CourseEntity[]> {
    return await this.courseRepository.find();
  }
}
