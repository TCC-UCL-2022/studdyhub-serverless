import container from "../../container";
import { ActivityController } from "../../modules/activity";

const activityController = container.resolve(ActivityController);

export const {
  createCourseActivity,
  getCourseActivities,
  activityPosProcessing,
} = activityController;
