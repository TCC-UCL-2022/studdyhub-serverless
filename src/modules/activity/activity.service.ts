import { BadRequestError } from "../../common/errors";
import { BaseService } from "../../common/services";
import { Activity } from "../../entities";
import { CourseService } from "../course";
import { CreateActivityDto } from "./dto";

export class ActivityService extends BaseService {
  private readonly courseService: CourseService;

  constructor() {
    super();

    this.courseService = new CourseService();
  }

  public async getCourseActivities(courseId: string): Promise<Activity[]> {
    const activityRepository = await this.getEntityRepository(Activity);

    const activities = await activityRepository.find({
      where: {
        active: true,
        course: {
          id: courseId,
        },
      },
    });

    await this.closeDatabaseConnection();

    return activities;
  }

  public async createCourseActivity(
    activityPayload: CreateActivityDto
  ): Promise<Activity> {
    const activityRepository = await this.getEntityRepository(Activity);

    const course = await this.courseService.getCourseById(
      activityPayload.courseId
    );

    if (!course) {
      throw new BadRequestError("Course not found");
    }

    const activity = new Activity();
    Object.assign(activity, activityPayload);

    activity.course = course;

    const createdActivity = await activityRepository.save(activity);

    await this.closeDatabaseConnection();

    return createdActivity;
  }
}
