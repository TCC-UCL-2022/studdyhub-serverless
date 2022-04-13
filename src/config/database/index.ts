import { DataSource } from "typeorm";
import { environments } from "src/config/environment";

export const dataSource = new DataSource({
  name: "studdyhub",
  type: "postgres",
  host: environments.DB_HOST,
  port: environments.DB_PORT,
  username: environments.DB_USERNAME,
  password: environments.DB_PASSWORD,
  database: environments.DB_NAME,
  synchronize: true,
  entities: [__dirname + "/../modules/*/*.entity.ts"],
});
