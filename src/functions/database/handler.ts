import container from "../../container";
import { DatabaseController } from "../../modules/database";

const databaseController = container.resolve(DatabaseController);

export const { initializeDatabase } = databaseController;
