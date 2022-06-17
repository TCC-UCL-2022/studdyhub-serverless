import { Handler } from "aws-lambda";
import { injectable } from "inversify";
import { HandlerEvent } from "../../common/types";
import { Logger, MessageUtil } from "../../common/utils";
import { DatabaseService } from "./database.service";

@injectable()
export class DatabaseController {
  private readonly logger: Logger;

  constructor(private readonly databaseService: DatabaseService) {
    this.logger = Logger.createLogger("DatabaseController");
  }

  initializeDatabase: Handler<HandlerEvent> = async (event) => {
    this.logger.debug("[initializeDatabase] invoked");

    try {
      await this.databaseService.initializeTables();

      return MessageUtil.success("Database initialized");
    } catch (err) {
      this.logger.error("[initializeDatabase] failed:", err);

      return MessageUtil.error(err);
    }
  };
}
