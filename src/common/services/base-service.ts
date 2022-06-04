import { DataSource, EntityTarget, Repository } from "typeorm";
import { createDatabase } from "typeorm-extension";
import { dataSourceOptions } from "../../config/database";
import { Logger } from "../utils";

export class BaseService {
  private readonly logger = Logger.createLogger("BaseService");
  private readonly dataSource = new DataSource(dataSourceOptions);

  private async loadDatabase() {
    if (this.dataSource.isInitialized) {
      return;
    }

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
      await this.dataSource.synchronize();
    } catch (error) {
      this.logger.error("Failed to synchronize database");
    }

    try {
      this.logger.debug("Initializing database");
      await this.dataSource.initialize();
    } catch (error) {
      this.logger.error("Failed to initialize database");
    }

    this.logger.debug("Database loaded");
  }

  public async getEntityRepository<T>(
    entity: EntityTarget<T>
  ): Promise<Repository<T>> {
    await this.loadDatabase();

    return this.dataSource.getRepository(entity);
  }

  public async closeDatabaseConnection() {
    await this.dataSource.destroy();
  }
}
