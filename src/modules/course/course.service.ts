import { Like, Repository } from "typeorm";
import { GetManyResponseDto } from "../../common/dto";
import { BadRequestError, NotFoundError } from "../../common/errors";
import { BaseService } from "../../common/services";
import { dataSource } from "../../config/database";
import { UserService } from "../user";
import { Course } from "./course.entity";
import { CreateCourseDto, GetCoursesRequestDto } from "./dto";

export class CourseService extends BaseService {
  courseRepository: Repository<Course>;
  userService: UserService;

  constructor() {
    super();
    this.courseRepository = dataSource.getRepository(Course);
    this.userService = new UserService();
  }

  public async getAllCourses({
    query,
    skip,
    take,
    orderBy,
    orderDirection,
    loadUser = false,
  }: GetCoursesRequestDto): Promise<GetManyResponseDto<Course>> {
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
      relations: loadUser ? ["user"] : [],
    });

    return {
      items,
      count,
    };
  }

  public async getCourseById(id: string): Promise<Course | null> {
    await this.loadDatabase();

    return await this.courseRepository.findOne({
      where: {
        id,
        active: true,
      },
    });
  }

  public async createCourse(course: CreateCourseDto): Promise<Course> {
    await this.loadDatabase();

    const user = await this.userService.getUserById(course.userId);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    return await this.courseRepository.save(course);
  }

  public async updateCourse(
    id: string,
    course: Partial<CreateCourseDto>
  ): Promise<Course | null> {
    await this.loadDatabase();

    const courseFound = await this.getCourseById(id);

    if (!courseFound) {
      throw new NotFoundError("Course not found");
    }

    return await this.courseRepository.save({
      ...course,
      id,
    });
  }
}
