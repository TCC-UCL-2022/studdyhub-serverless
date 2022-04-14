import { Repository } from "typeorm";
import { GetManyResponseDto } from "../../common/dto";
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
  }: GetCoursesRequestDto): Promise<GetManyResponseDto<CourseEntity>> {
    await this.loadDatabase();

    const [items, count] = await this.courseRepository.findAndCount({
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
      items,
      count,
    };
  }
}
