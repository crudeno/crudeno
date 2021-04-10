import Database from "../../contracts/database.ts";
import Config from "../../contracts/config.ts";
import { Connector, PostgresConnector } from "../../../deps.ts";

export class PostgreSQLDatabase extends Database {
  protected connect(config: Config): Connector {
    return new PostgresConnector({
      database: config.databaseName,
      host: config.databaseHost,
      username: config.databaseUser || "",
      password: config.databasePassword || "",
      port: parseInt(config.databasePort, 10),
    });
  }
}
