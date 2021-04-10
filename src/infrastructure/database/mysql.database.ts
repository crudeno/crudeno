import Database from "../../contracts/database.ts";
import Config from "../../contracts/config.ts";
import { Connector, MySQLConnector } from "../../../deps.ts";

export class MySQLDatabase extends Database {
  protected connect(config: Config): Connector {
    return new MySQLConnector({
      database: config.databaseName,
      host: config.databaseHost,
      username: config.databaseUser || "",
      password: config.databasePassword || "",
      port: parseInt(config.databasePort, 10),
    });
  }
}
