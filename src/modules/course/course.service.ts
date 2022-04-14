import { Repository } from "typeorm";
import { BaseService } from "../../common/services";
import { dataSource } from "../../config/database";
import { CourseEntity } from "./course.entity";
import { GetCoursesRequestDto } from "./dto/request";

export class CourseService extends BaseService {
  courseRepository: Repository<CourseEntity>;

  constructor() {
    super();
    this.courseRepository = dataSource.getRepository(CourseEntity);
  }

  public async getAllCourses({
    skip,
    take,
    orderBy,
    orderDirection,
  }: GetCoursesRequestDto): Promise<{
    courses: CourseEntity[];
    count: number;
  }> {
    await this.loadDatabase();

    const [courses, count] = await this.courseRepository.findAndCount({
      where: {
        active: true,
      },
      skip,
      take,
      order: {
        ...(orderBy && {
          [orderBy]: orderDirection ?? "ASC",
        }),
      },
    });

    return {
      courses,
      count,
    };
  }
}
