import { Repository } from "typeorm";
import { BaseService } from "../../common/services";
import { dataSource } from "../../config/database";
import { UserService } from "../user";
import { Activity } from "./activity.entity";

export class ActivityService extends BaseService {
  private readonly activityRepository: Repository<Activity>;
  private readonly userService: UserService;

  constructor() {
    super();

    this.activityRepository = dataSource.getRepository(Activity);
    this.userService = new UserService();
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
}
