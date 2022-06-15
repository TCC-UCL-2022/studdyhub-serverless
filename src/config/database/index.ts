import * as dynamoose from "dynamoose";
import {
  ActivityModel,
  CourseModel,
  EnrollmentModel,
  UserModel,
} from "../../models";
import { environments } from "../environment";

const setupDb = () => {
  if (environments.NODE_ENV === "production") {
    dynamoose.aws.ddb();
    return;
  }

  dynamoose.aws.ddb.local(environments.DB_URL);
};

export const setupDynamo = async () => {
  setupDb();

  await new dynamoose.Table(
    "studdyhub",
    [UserModel, CourseModel, ActivityModel, EnrollmentModel],
    {
      create: true,
      update: true,
    }
  ).initialize();
};
