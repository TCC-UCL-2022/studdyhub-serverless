import * as dynamoose from "dynamoose";
import { ModelType } from "dynamoose/dist/General";
import { Table, TableOptions } from "dynamoose/dist/Table";
import { Logger } from "../../common/utils";
import {
  ActivityModel,
  CourseModel,
  EnrollmentModel,
  UserModel,
} from "../../models";

const defaultConfig: Partial<TableOptions> = {
  initialize: false,
  create: true,
  update: false,
  prefix: "studdyhub_",
};
export class DatabaseService {
  private readonly logger = Logger.createLogger("Database");

  private createModelTable(model: ModelType<any>): Table {
    return new dynamoose.Table(model.tableName, [model], defaultConfig);
  }

  public createTables(): Table[] {
    this.logger.info("Creating table");

    const models = [ActivityModel, CourseModel, EnrollmentModel, UserModel];

    const tables = models.map((model) => this.createModelTable(model));

    return tables;
  }
}
