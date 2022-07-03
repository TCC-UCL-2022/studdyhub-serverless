import { injectable } from "inversify";
import { GetManyResponseDto } from "../../common/dto";
import { BadRequestError, NotFoundError } from "../../common/errors";
import { generateUuid } from "../../common/utils";
import { Course, CourseModel } from "../../models";
import { DatabaseService } from "../database";
import { UserService } from "../user";
import { CreateCourseDto, GetCoursesRequestDto, UpdateCourseDto } from "./dto";

@injectable()
export class CourseService {
  constructor(
    private readonly userService: UserService,
    private readonly databaseService: DatabaseService
  ) {
    this.databaseService.initializeTableWihtoutCreating(CourseModel);
  }

  public async getAllCourses({
    query,
    loadUser = "false",
    published = "true",
  }: GetCoursesRequestDto): Promise<GetManyResponseDto<Course>> {
    const isPublished = published === "true";
    const isLoadUser = loadUser === "true";

    const scan = CourseModel.scan().where("published").eq(isPublished);

    if (query) {
      scan
        .and()
        .parenthesis((condition) =>
          condition
            .where("title")
            .contains(query)
            .or()
            .where("description")
            .contains(query)
        );
    }

    const courses = await scan.parallel(2).all().exec();

    if (isLoadUser) {
      await courses.populate();
    }

    return {
      items: courses,
      count: courses.count,
    };
  }

  public async getCoursesByUserId(userId: string): Promise<Course[]> {
    const courses = await CourseModel.query("user").eq(userId).exec();

    return courses;
  }

  public async getCourseById(id: string): Promise<Course> {
    const course = await CourseModel.get({
      id,
    });

    if (!course) {
      throw new NotFoundError("Course not found");
    }

    await course.populate();

    return course;
  }

  public async createCourse({
    description,
    title,
    userId,
  }: CreateCourseDto): Promise<Course> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    const courseCreated = await CourseModel.create({
      id: generateUuid(),
      title,
      description,
      user,
    });

    return courseCreated;
  }

  public async updateCourse(
    id: string,
    payload: UpdateCourseDto
  ): Promise<Course | null> {
    const course = await this.getCourseById(id);

    Object.assign(course, payload);

    await course.save();

    return course;
  }

  public async deleteCourse(id: string): Promise<Course | null> {
    const course = await this.getCourseById(id);

    await course.delete();

    return course;
  }
}
