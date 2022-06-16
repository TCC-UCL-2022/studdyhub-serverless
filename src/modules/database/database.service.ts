import * as dynamoose from "dynamoose";
import { ModelType } from "dynamoose/dist/General";
import { Item } from "dynamoose/dist/Item";
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

  private createModelTable(
    model: ModelType<Item>,
    options?: Partial<TableOptions>
  ): Table {
    return new dynamoose.Table(model.name, [model], {
      ...defaultConfig,
      ...options,
    });
  }

  public async initializeTables(): Promise<void> {
    this.logger.info("Creating tables");

    const models = [ActivityModel, CourseModel, EnrollmentModel, UserModel];

    const tables = models.map((model) => this.createModelTable(model));

    const promises = tables.map((table) => table.initialize());

    await Promise.all(promises);
  }

  public async initializeTableWihtoutCreating(
    model: ModelType<Item>
  ): Promise<void> {
    this.logger.info(`Initializing table for model [${model.name}]`);

    const table = this.createModelTable(model, {
      create: false,
      waitForActive: false,
    });
    await table.initialize();
  }
}
