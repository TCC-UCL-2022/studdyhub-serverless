import * as dynamoose from "dynamoose";
import { ModelType } from "dynamoose/dist/General";
import { Item } from "dynamoose/dist/Item";
import { Table, TableOptions } from "dynamoose/dist/Table";
import { injectable } from "inversify";
import { Logger } from "../../common/utils";
import { environments } from "../../config/environment";
import { CourseModel, EnrollmentModel, UserModel } from "../../models";

const defaultConfig: Partial<TableOptions> = {
  initialize: false,
  create: true,
  update: environments.NODE_ENV === "production" ? true : false,
  prefix: "studdyhub_",
};

@injectable()
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

    const models = [CourseModel, EnrollmentModel, UserModel];

    const tables = models.map((model) => this.createModelTable(model));

    const promises = tables.map((table) => table.initialize());

    await Promise.all(promises);
  }

  public async initializeTableWihtoutCreating(
    model: ModelType<Item>
  ): Promise<void> {
    this.logger.info(`Initializing table for model [${model.name}]`);

    try {
      const table = this.createModelTable(model, {
        create: false,
        update: false,
        waitForActive: false,
      });

      await table.initialize();
    } catch (error) {
      this.logger.error(`Failed to initialize table for model [${model.name}]`);
    }
  }
}
