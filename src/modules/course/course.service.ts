import { Like, Repository } from "typeorm";
import { GetManyResponseDto } from "../../common/dto";
import { BadRequestError, NotFoundError } from "../../common/errors";
import { BaseService } from "../../common/services";
import { dataSource } from "../../config/database";
import { TeacherService } from "../teacher";
import { CourseEntity } from "./course.entity";
import { GetCoursesRequestDto } from "./dto/request";

export class CourseService extends BaseService {
  courseRepository: Repository<CourseEntity>;
  teacherService: TeacherService;

  constructor() {
    super();
    this.courseRepository = dataSource.getRepository(CourseEntity);
    this.teacherService = new TeacherService();
  }

  public async getAllCourses({
    query,
    skip,
    take,
    orderBy,
    orderDirection,
    loadTeacher = false,
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
      relations: loadTeacher ? ["teacher"] : [],
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

    const teacher = await this.teacherService.getTeacherById(
      `${course.teacher}`
    );

    if (!teacher) {
      throw new BadRequestError("Teacher not found");
    }

    return await this.courseRepository.save(course);
  }

  public async updateCourse(
    id: string,
    course: Partial<CourseEntity>
  ): Promise<CourseEntity | null> {
    await this.loadDatabase();

    const courseFound = await this.getCourseById(id);

    if (!courseFound) {
      throw new NotFoundError("Course not found");
    }

    if (course.teacher) {
      const teacher = await this.teacherService.getTeacherById(
        `${course.teacher}`
      );

      if (!teacher) {
        throw new BadRequestError("Teacher not found");
      }
    }

    return await this.courseRepository.save({
      ...course,
      id,
    });
  }
}
