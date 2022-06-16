import { injectable } from "inversify";
import { GetManyResponseDto } from "../../common/dto";
import { BadRequestError, NotFoundError } from "../../common/errors";
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
    loadUser = false,
    published = true,
  }: GetCoursesRequestDto): Promise<GetManyResponseDto<Course>> {
    const scan = CourseModel.scan().where("published").eq(published);

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

    if (loadUser) {
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
      title,
      description,
      user,
    });

    return courseCreated;
  }

  public async updateCourse(
    id: string,
    course: UpdateCourseDto
  ): Promise<Course | null> {
    await this.getCourseById(id);

    const updated = await CourseModel.update({ id }, { ...course });

    return updated;
  }

  public async deleteCourse(id: string): Promise<Course | null> {
    const course = await this.getCourseById(id);

    await CourseModel.delete(id);

    return course;
  }
}
