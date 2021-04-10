import { Schema } from "../../deps.ts";

export default interface Config {
  schema: Schema;
  entity?: string;

  apiInterface: "graphql" | "rest";
  apiHost?: string;
  apiPort?: string;
  apiPrefix?: string;

  databaseDriver: "mongodb" | "mysql" | "postegresql" | "sqlite";
  databaseHost: string;
  databasePort: string;
  databaseName: string;
  databaseUser?: string;
  databasePassword?: string;
  databasePath?: string;
}
