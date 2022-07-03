import { injectable } from "inversify";
import { ConflictError } from "../../common/errors";
import { generateUuid } from "../../common/utils";
import { Enrollment, EnrollmentModel } from "../../models";
import { CourseService } from "../course";
import { DatabaseService } from "../database";
import { UserService } from "../user";
import { CreateEnrollmentDto } from "./dto";

@injectable()
export class EnrollmentService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly CourseService: CourseService,
    private readonly UserService: UserService
  ) {
    this.databaseService.initializeTableWihtoutCreating(EnrollmentModel);
  }

  public async createErollment({
    courseId,
    userId,
  }: CreateEnrollmentDto): Promise<Enrollment> {
    const user = await this.UserService.getUserById(userId);
    const course = await this.CourseService.getCourseById(courseId);

    const existingEnrollment = await EnrollmentModel.scan("course")
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

    const createdEnrollment = await EnrollmentModel.create({
      id: generateUuid(),
      course,
      user,
    });

    return createdEnrollment;
  }

  public async getEnrollmentsByUserId(userId: string): Promise<Enrollment[]> {
    const enrollments = await EnrollmentModel.query("user").eq(userId).exec();

    await enrollments.populate();

    return enrollments;
  }
}
