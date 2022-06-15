import { setupDynamo } from "../../config/database";
import {
  ActivityModel,
  CourseModel,
  EnrollmentModel,
  UserModel,
} from "../../models";
import { ActivityController, ActivityService } from "../activity";
import { CourseController, CourseService } from "../course";
import { DatabaseController, DatabaseService } from "../database";
import { EnrollmentController, EnrollmentService } from "../enrollment";
import { UserController, UserService } from "../user";

setupDynamo();

const databaseService = new DatabaseService();
const userService = new UserService(UserModel);
const courseService = new CourseService(CourseModel, userService);
const activityService = new ActivityService(ActivityModel, courseService);
const enrollmentService = new EnrollmentService(
  EnrollmentModel,
  courseService,
  userService
);

export const databaseController = new DatabaseController(databaseService);
export const userController = new UserController(userService);
export const courseController = new CourseController(courseService);
export const activityController = new ActivityController(activityService);
export const enrollmentController = new EnrollmentController(enrollmentService);
