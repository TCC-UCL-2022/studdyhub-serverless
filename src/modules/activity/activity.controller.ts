import { Handler } from "aws-lambda";
import { HandlerEvent } from "../../common/types";
import { Logger, MessageUtil } from "../../common/utils";
import { ActivityService } from "./activity.service";

export class ActivityController {
  private readonly logger: Logger;
  private readonly activityService: ActivityService;

  constructor() {
    this.logger = Logger.createLogger("ActivityController");
    this.activityService = new ActivityService();
  }

  getCourseActivities: Handler<HandlerEvent<{ id: string }>> = async (
    event
  ) => {
    this.logger.debug(
      "[getCourseActivities] invoked for courseId:",
      event.pathParameters.id
    );

    try {
      const { id } = event.pathParameters;

      this.logger.debug("[getCourseActivities] invoked for courseId:", id);

      const activities = await this.activityService.getCourseActivities(id);

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
}
