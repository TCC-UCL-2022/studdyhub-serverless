import { ActivityController, ActivityService } from "../activity";
import { CourseController, CourseService } from "../course";
import { DatabaseService } from "../database";
import { EnrollmentController, EnrollmentService } from "../enrollment";
import { UserController, UserService } from "../user";

const databaseService = new DatabaseService();

const userService = new UserService(databaseService);
const courseService = new CourseService(databaseService, userService);
const activityService = new ActivityService(databaseService, courseService);
const enrollmentService = new EnrollmentService(
  databaseService,
  courseService,
  userService
);

export const userController = new UserController(userService);
export const courseController = new CourseController(courseService);
export const activityController = new ActivityController(activityService);
export const enrollmentController = new EnrollmentController(enrollmentService);
