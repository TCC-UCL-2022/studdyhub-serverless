import { ActivityController } from "../../modules/activity";

const controller = new ActivityController();

export const getCourseActivities =
  controller.getCourseActivities.bind(controller);

export const createCourseActivity =
  controller.createCourseActivity.bind(controller);
