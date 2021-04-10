import { Connector, Database as Connection } from "../../deps.ts";
import Config from "./config.ts";

export default abstract class Database {
  protected _connection: Connection | undefined;
  private readonly _connector: Connector | undefined;

  constructor(config: Config) {
    this._connector = this.connect(config);
  }

  get connection(): Connection {
    if (this._connection) {
      return this._connection;
    }

    if (this._connector) {
      this._connection = new Connection(this._connector);
    }

    return this.connection;
  }

  protected abstract connect(config: Config): Connector;
}
