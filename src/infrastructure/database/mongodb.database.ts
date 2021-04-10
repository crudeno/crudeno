import { Connector, MongoDBConnector } from "../../../deps.ts";
import Database from "../../contracts/database.ts";
import Config from "../../contracts/config.ts";

export class MongoDBDatabase extends Database {
  protected connect(config: Config): Connector {
    return new MongoDBConnector({
      uri: `mongodb://${config.databaseHost}:${config.databasePort}`,
      database: config.databaseName,
    });
  }
}
