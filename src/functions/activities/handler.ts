import { dataSource } from "../../config/database";
import { ActivityController } from "../../modules/activity";

dataSource.initialize();

const controller = new ActivityController();

export const getCourseActivities =
  controller.getCourseActivities.bind(controller);

export const createCourseActivity =
  controller.createCourseActivity.bind(controller);
