import Provider from "./provider.ts";
import Database from "../contracts/database.ts";
import Config from "../contracts/config.ts";
import { SQLiteDatabase } from "../infrastructure/database/sqlite.database.ts";
import { PostgreSQLDatabase } from "../infrastructure/database/postgresql.database.ts";
import { MySQLDatabase } from "../infrastructure/database/mysql.database.ts";
import { MongoDBDatabase } from "../infrastructure/database/mongodb.database.ts";

export default class DatabaseProvider extends Provider {
  static provide(config: Config): Database {
    switch (config.databaseDriver) {
      case "mongodb":
        return new MongoDBDatabase(config);

      case "mysql":
        return new MySQLDatabase(config);

      case "postegresql":
        return new PostgreSQLDatabase(config);

      case "sqlite":
        return new SQLiteDatabase(config);
    }

    throw new Error("Invalid database driver was given");
  }
}
