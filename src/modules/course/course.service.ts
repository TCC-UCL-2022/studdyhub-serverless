import { FindOneOptions, ILike } from "typeorm";
import { GetManyResponseDto } from "../../common/dto";
import { BadRequestError, NotFoundError } from "../../common/errors";
import { Course } from "../../entities";
import { DatabaseService } from "../database";
import { UserService } from "../user";
import { CreateCourseDto, GetCoursesRequestDto, UpdateCourseDto } from "./dto";

export class CourseService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService
  ) {}

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
    const courseRepository = await this.databaseService.getEntityRepository(
      Course
    );

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

    await this.databaseService.closeDatabaseConnection();

    return {
      items,
      count,
    };
  }

  public async getCourseById(id: string): Promise<Course | null> {
    const courseRepository = await this.databaseService.getEntityRepository(
      Course
    );

    const course = await courseRepository.findOne({
      where: {
        id,
        active: true,
      },
    });

    await this.databaseService.closeDatabaseConnection();

    return course;
  }

  public async createCourse(payload: CreateCourseDto): Promise<Course> {
    const courseRepository = await this.databaseService.getEntityRepository(
      Course
    );

    const user = await this.userService.getUserByCognitoId(payload.userId);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    const course = new Course();
    course.title = payload.title;
    course.description = payload.description;
    course.user = user;

    const courseCreated = await courseRepository.save(course);

    await this.databaseService.closeDatabaseConnection();

    return courseCreated;
  }

  public async updateCourse(
    id: string,
    course: UpdateCourseDto
  ): Promise<Course | null> {
    const courseRepository = await this.databaseService.getEntityRepository(
      Course
    );

    const courseFound = await this.getCourseById(id);

    if (!courseFound) {
      throw new NotFoundError("Course not found");
    }

    const updated = await courseRepository.save({
      ...course,
      id,
    });

    await this.databaseService.closeDatabaseConnection();

    return updated;
  }

  public async deleteCourse(id: string): Promise<Course | null> {
    const courseRepository = await this.databaseService.getEntityRepository(
      Course
    );

    const courseFound = await this.getCourseById(id);

    if (!courseFound) {
      throw new NotFoundError("Course not found");
    }

    const course = await courseRepository.save({
      ...courseFound,
      active: false,
    });

    await this.databaseService.closeDatabaseConnection();

    return course;
  }
}
