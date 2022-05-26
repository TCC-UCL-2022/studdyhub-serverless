import { Repository } from "typeorm";
import { BadRequestError } from "../../common/errors";
import { BaseService } from "../../common/services";
import { dataSource } from "../../config/database";
import { CourseService } from "../course";
import { Activity } from "./activity.entity";
import { CreateActivityDto } from "./dto";

export class ActivityService extends BaseService {
  private readonly activityRepository: Repository<Activity>;
  private readonly courseService: CourseService;

  constructor() {
    super();
    this.activityRepository = dataSource.getRepository(Activity);
    this.courseService = new CourseService();
  }

  public async getCourseActivities(courseId: string): Promise<Activity[]> {
    await this.loadDatabase();

    const activities = await this.activityRepository.find({
      where: {
        active: true,
        course: {
          id: courseId,
        },
      },
    });

    return activities;
  }

  public async createCourseActivity(
    activityPayload: CreateActivityDto
  ): Promise<Activity> {
    await this.loadDatabase();

    const course = await this.courseService.getCourseById(
      activityPayload.courseId
    );

    if (!course) {
      throw new BadRequestError("Course not found");
    }

    const activity = new Activity();
    Object.assign(activity, activityPayload);

    activity.course = course;

    return this.activityRepository.save(activity);
  }
}
