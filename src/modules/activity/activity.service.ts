import { BadRequestError } from "../../common/errors";
import { Activity } from "../../entities";
import { CourseService } from "../course";
import { DatabaseService } from "../database";
import { CreateActivityDto } from "./dto";

export class ActivityService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly courseService: CourseService
  ) {}

  public async getCourseActivities(courseId: string): Promise<Activity[]> {
    const activityRepository = await this.databaseService.getEntityRepository(
      Activity
    );

    const activities = await activityRepository.find({
      where: {
        active: true,
        course: {
          id: courseId,
        },
      },
    });

    await this.databaseService.closeDatabaseConnection();

    return activities;
  }

  public async createCourseActivity(
    activityPayload: CreateActivityDto
  ): Promise<Activity> {
    const course = await this.courseService.getCourseById(
      activityPayload.courseId
    );

    if (!course) {
      throw new BadRequestError("Course not found");
    }

    const activityRepository = await this.databaseService.getEntityRepository(
      Activity
    );

    const activity = new Activity();
    Object.assign(activity, activityPayload);

    activity.course = course;

    const createdActivity = await activityRepository.save(activity);

    await this.databaseService.closeDatabaseConnection();

    return createdActivity;
  }
}
