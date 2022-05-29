import { Like } from "typeorm";
import { GetManyResponseDto } from "../../common/dto";
import { BadRequestError, NotFoundError } from "../../common/errors";
import { BaseService } from "../../common/services";
import { UserService } from "../user";
import { Course } from "./course.entity";
import { CreateCourseDto, GetCoursesRequestDto, UpdateCourseDto } from "./dto";

export class CourseService extends BaseService {
  private readonly userService: UserService;

  constructor() {
    super();

    this.userService = new UserService();
  }

  public async getAllCourses({
    query,
    skip = 0,
    take = 50,
    orderBy,
    orderDirection,
    loadUser = false,
    userId,
    published,
  }: GetCoursesRequestDto): Promise<GetManyResponseDto<Course>> {
    const courseRepository = await this.getEntityRepository(Course);

    const [items, count] = await courseRepository.findAndCount({
      where: {
        active: true,
        title: query && Like(`%${query}%`),
        description: query && Like(`%${query}%`),
        user: userId ? { id: userId } : undefined,
        published: published ? published : undefined,
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
    const courseRepository = await this.getEntityRepository(Course);

    return await courseRepository.findOne({
      where: {
        id,
        active: true,
      },
    });
  }

  public async createCourse(payload: CreateCourseDto): Promise<Course> {
    const courseRepository = await this.getEntityRepository(Course);

    const user = await this.userService.getUserByCognitoId(payload.userId);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    const course = new Course();
    course.title = payload.title;
    course.description = payload.description;
    course.user = user;

    return await courseRepository.save(course);
  }

  public async updateCourse(
    id: string,
    course: UpdateCourseDto
  ): Promise<Course | null> {
    const courseRepository = await this.getEntityRepository(Course);

    const courseFound = await this.getCourseById(id);

    if (!courseFound) {
      throw new NotFoundError("Course not found");
    }

    return await courseRepository.save({
      ...course,
      id,
    });
  }
}
