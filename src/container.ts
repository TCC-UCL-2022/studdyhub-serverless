import { Container } from "inversify";
import "reflect-metadata";
import { setupDynamo } from "./config/database";
import { ActivityController, ActivityService } from "./modules/activity";
import { CourseController, CourseService } from "./modules/course";
import { DatabaseController, DatabaseService } from "./modules/database";
import { EnrollmentController, EnrollmentService } from "./modules/enrollment";
import { UserController, UserService } from "./modules/user";

// setup dynamoose to use local or production db;
setupDynamo();

const container = new Container();

// bind services
container.bind<ActivityService>(ActivityService).toSelf();
container.bind<CourseService>(CourseService).toSelf();
container.bind<DatabaseService>(DatabaseService).toSelf();
container.bind<EnrollmentService>(EnrollmentService).toSelf();
container.bind<UserService>(UserService).toSelf();

// bind controllers
container.bind<ActivityController>(ActivityController).toSelf();
container.bind<CourseController>(CourseController).toSelf();
container.bind<DatabaseController>(DatabaseController).toSelf();
container.bind<EnrollmentController>(EnrollmentController).toSelf();
container.bind<UserController>(UserController).toSelf();

export default container;
