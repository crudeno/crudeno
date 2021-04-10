import Database from "../../contracts/database.ts";
import Config from "../../contracts/config.ts";
import { Connector, SQLite3Connector } from "../../../deps.ts";

export class SQLiteDatabase extends Database {
  protected connect(config: Config): Connector {
    if (!config.databasePath) {
      throw new Error("Please provide a valid SQLite database path");
    }

    return new SQLite3Connector({
      filepath: config.databasePath,
    });
  }
}
