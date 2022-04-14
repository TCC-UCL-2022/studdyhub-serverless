import { dataSource } from "../../config/database";

export class BaseService {
  constructor() {
    this.loadDatabase();
  }

  public async loadDatabase() {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
  }
}
