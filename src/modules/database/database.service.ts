import * as dynamoose from "dynamoose";
import { Table } from "dynamoose/dist/Table";
import { Logger } from "../../common/utils";
import {
  ActivityModel,
  CourseModel,
  EnrollmentModel,
  UserModel
} from "../../models";
export class DatabaseService {
  private readonly logger = Logger.createLogger("Database");

  public createTable(): Table {
    this.logger.info("Creating table");

    const table = new dynamoose.Table(
      "studdyhub",
      [ActivityModel, CourseModel, EnrollmentModel, UserModel],
      {
        initialize:false,
        create: true,
        update: true,
      }
    );

    return table;
  }
}
