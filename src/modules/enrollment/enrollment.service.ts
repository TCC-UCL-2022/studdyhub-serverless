import { ConflictError } from "../../common/errors";
import { Enrollment, EnrollmentModel } from "../../models";
import { CourseService } from "../course";
import { UserService } from "../user";
import { CreateEnrollmentDto } from "./dto";

export class EnrollmentService {
  constructor(
    private readonly enrollmentModel: typeof EnrollmentModel,
    private readonly CourseService: CourseService,
    private readonly UserService: UserService
  ) {}

  public async createErollment({
    courseId,
    userId,
  }: CreateEnrollmentDto): Promise<Enrollment> {
    const user = await this.UserService.getUserById(userId);
    const course = await this.CourseService.getCourseById(courseId);

    const existingEnrollment = await this.enrollmentModel
      .scan("course")
      .eq(courseId)
      .and()
      .where("user")
      .eq(userId)
      .exec();

    if (existingEnrollment.count > 0) {
      throw new ConflictError(
        `User with id ${userId} already enrolled in course with id ${courseId}`
      );
    }

    const createdEnrollment = await this.enrollmentModel.create({
      course,
      user,
    });

    return createdEnrollment;
  }

  public async getEnrollmentsByUserId(userId: string): Promise<Enrollment[]> {
    const enrollments = await this.enrollmentModel
      .query("user")
      .eq(userId)
      .exec();

    await enrollments.populate();

    return enrollments;
  }
}
