import { Handler } from "aws-lambda";
import { HandlerEvent } from "../../common/types";
import { Logger, MessageUtil } from "../../common/utils";
import { DatabaseService } from "./database.service";

export class DatabaseController {
  private readonly logger: Logger;

  constructor(private readonly databaseService: DatabaseService) {
    this.logger = Logger.createLogger("DatabaseController");
  }

  initializeDatabase: Handler<HandlerEvent> = async (event) => {
    this.logger.debug("[initializeDatabase] invoked");

    try {
      const database = this.databaseService.createTable();

      await database.initialize();

      return MessageUtil.success("Database initialized");
    } catch (err) {
      this.logger.error("[initializeDatabase] failed:", err);

      return MessageUtil.error(err);
    }
  };
}
