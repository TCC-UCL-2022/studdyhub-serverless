import { FindOneOptions, ILike } from "typeorm";
import { GetManyResponseDto } from "../../common/dto";
import { BadRequestError, NotFoundError } from "../../common/errors";
import { BaseService } from "../../common/services";
import { Course } from "../../entities";
import { UserService } from "../user";
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

    const baseWhere: FindOneOptions<Course>["where"] = {
      active: true,
      ...(published && { published: true }),
      ...(userId && { user: { id: userId } }),
    };

    const [items, count] = await courseRepository.findAndCount({
      where: [
        {
          ...baseWhere,
          ...(query && {
            title: ILike(`%${query}%`),
          }),
        },
        {
          ...baseWhere,
          ...(query && {
            description: ILike(`%${query}%`),
          }),
        },
      ],
      skip,
      take,
      order: {
        ...(orderBy && {
          [orderBy]: orderDirection ?? "ASC",
        }),
      },
      relations: loadUser ? ["user"] : [],
    });

    await this.closeDatabaseConnection();

    return {
      items,
      count,
    };
  }

  public async getCourseById(id: string): Promise<Course | null> {
    const courseRepository = await this.getEntityRepository(Course);

    const course = await courseRepository.findOne({
      where: {
        id,
        active: true,
      },
    });

    await this.closeDatabaseConnection();

    return course;
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

    const courseCreated = await courseRepository.save(course);

    await this.closeDatabaseConnection();

    return courseCreated;
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

    const updated = await courseRepository.save({
      ...course,
      id,
    });

    await this.closeDatabaseConnection();

    return updated;
  }

  public async deleteCourse(id: string): Promise<Course | null> {
    const courseRepository = await this.getEntityRepository(Course);

    const courseFound = await this.getCourseById(id);

    if (!courseFound) {
      throw new NotFoundError("Course not found");
    }

    const course = await courseRepository.save({
      ...courseFound,
      active: false,
    });

    await this.closeDatabaseConnection();

    return course;
  }
}
