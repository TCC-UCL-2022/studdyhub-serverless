import { Handler } from "aws-lambda";
import { HandlerEvent } from "../../common/types";
import { Logger, MessageUtil } from "../../common/utils";
import { ActivityService } from "./activity.service";
import { CreateActivityDto } from "./dto";

export class ActivityController {
  private readonly logger: Logger;

  constructor(private readonly activityService: ActivityService) {
    this.logger = Logger.createLogger("ActivityController");
  }

  getCourseActivities: Handler<HandlerEvent<{ courseId: string }>> = async (
    event
  ) => {
    this.logger.debug(
      "[getCourseActivities] invoked for courseId:",
      event.pathParameters.courseId
    );

    try {
      const { courseId } = event.pathParameters;

      this.logger.debug(
        "[getCourseActivities] invoked for courseId:",
        courseId
      );

      const activities = await this.activityService.getCourseActivities(
        courseId
      );

      if (!activities) {
        return [];
      }

      this.logger.debug(
        `[getCourseActivities] found: ${activities.length} activities`
      );

      return MessageUtil.success(activities);
    } catch (err) {
      this.logger.error("[getCourseActivities] failed:", err);

      return MessageUtil.error(err);
    }
  };

  createCourseActivity: Handler<HandlerEvent> = async (event) => {
    try {
      const activityPayload: CreateActivityDto = JSON.parse(event.body);

      this.logger.debug(
        "[createCourseActivity] invoked for courseId:",
        activityPayload.courseId
      );

      const activity = await this.activityService.createCourseActivity(
        activityPayload
      );

      this.logger.debug(
        "[createCourseActivity] created activity:",
        activity.id
      );

      return MessageUtil.success(activity);
    } catch (error) {
      this.logger.error("[createCourseActivity] failed:", error);

      return MessageUtil.error(error);
    }
  };
}
