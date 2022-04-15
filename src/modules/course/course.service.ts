import { Like, Repository } from "typeorm";
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
    query,
    skip,
    take,
    orderBy,
    orderDirection,
  }: GetCoursesRequestDto): Promise<GetManyResponseDto<CourseEntity>> {
    await this.loadDatabase();

    const [items, count] = await this.courseRepository.findAndCount({
      where: {
        active: true,
        title: query && Like(`%${query}%`),
        description: query && Like(`%${query}%`),
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

  public async getCourseById(id: string): Promise<CourseEntity | null> {
    await this.loadDatabase();

    return await this.courseRepository.findOne({
      where: {
        id,
        active: true,
      },
    });
  }
}
