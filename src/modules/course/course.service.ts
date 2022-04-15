import { Like, Repository } from "typeorm";
import { GetManyResponseDto } from "../../common/dto";
import { BadRequestError } from "../../common/errors";
import { BaseService } from "../../common/services";
import { dataSource } from "../../config/database";
import { TeacherEntity } from "../teacher";
import { CourseEntity } from "./course.entity";
import { GetCoursesRequestDto } from "./dto/request";

export class CourseService extends BaseService {
  courseRepository: Repository<CourseEntity>;
  teacherRepository: Repository<TeacherEntity>;

  constructor() {
    super();
    this.courseRepository = dataSource.getRepository(CourseEntity);
    this.teacherRepository = dataSource.getRepository(TeacherEntity);
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

  public async createCourse(course: CourseEntity): Promise<CourseEntity> {
    await this.loadDatabase();

    const teacher = await this.teacherRepository.findOne({
      where: {
        id: `${course.teacher}`,
      },
    });

    if (!teacher) {
      throw new BadRequestError("Teacher not found");
    }

    return await this.courseRepository.save(course);
  }
}
