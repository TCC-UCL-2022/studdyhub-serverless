import { EntityTarget, Repository } from "typeorm";
import { createDatabase } from "typeorm-extension";
import { dataSource, dataSourceOptions } from "../../config/database";
import { Logger } from "../utils";

export class BaseService {
  private readonly logger = Logger.createLogger("BaseService");

  private async loadDatabase() {
    try {
      this.logger.debug("Loading database...");
      await createDatabase({
        options: dataSourceOptions,
        ifNotExist: true,
      });
    } catch (err) {
      this.logger.error("Failed to load database");
    }

    try {
      this.logger.debug("Synchronizing database...");
      await dataSource.synchronize();
    } catch (error) {
      this.logger.error("Failed to synchronize database");
    }

    try {
      this.logger.debug("Initializing database");
      await dataSource.initialize();
    } catch (error) {
      this.logger.error("Failed to initialize database");
    }

    this.logger.debug("Database loaded");
  }

  public async getEntityRepository<T>(
    entity: EntityTarget<T>
  ): Promise<Repository<T>> {
    await this.loadDatabase();

    return dataSource.getRepository(entity);
  }
}
