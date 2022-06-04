import { ConflictError, NotFoundError } from "../../common/errors";
import { Enrollment } from "../../entities";
import { CourseService } from "../course";
import { DatabaseService } from "../database";
import { UserService } from "../user";
import { CreateEnrollmentDto } from "./dto";

export class EnrollmentService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly CourseService: CourseService,
    private readonly UserService: UserService
  ) {}

  public async createErollment({
    courseId,
    userId,
  }: CreateEnrollmentDto): Promise<Enrollment> {
    const enrollmentRepository = await this.databaseService.getEntityRepository(
      Enrollment
    );

    const user = await this.UserService.getUserById(userId);
    const course = await this.CourseService.getCourseById(courseId);

    if (!course) {
      throw new NotFoundError(`Course with id ${courseId} not found`);
    }

    const existingEnrollment = await enrollmentRepository.findOne({
      where: {
        course: { id: courseId },
        user: {
          id: userId,
        },
      },
    });

    if (existingEnrollment) {
      throw new ConflictError(
        `User with id ${userId} already enrolled in course with id ${courseId}`
      );
    }

    const enrollment = new Enrollment();

    enrollment.course = course;
    enrollment.user = user;

    const createdEnrollment = await enrollmentRepository.save(enrollment);

    await this.databaseService.closeDatabaseConnection();

    return createdEnrollment;
  }

  public async getEnrollmentsByUserId(userId: string): Promise<Enrollment[]> {
    const enrollmentRepository = await this.databaseService.getEntityRepository(
      Enrollment
    );

    const enrollments = await enrollmentRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ["course"],
    });

    await this.databaseService.closeDatabaseConnection();

    return enrollments;
  }
}
