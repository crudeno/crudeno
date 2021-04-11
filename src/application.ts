import { log } from "../deps.ts";
import Config from "./contracts/config.ts";
import DatabaseProvider from "./providers/database.provider.ts";
import Database from "./contracts/database.ts";
import ServerProvider from "./providers/server.provider.ts";
import Server from "./contracts/server.ts";

export default class Application {
  private static _instance: Application;

  private readonly config: Config | undefined;
  private readonly database: Database | undefined;
  private readonly server: Server | undefined;

  constructor(config: Config) {
    if (Application._instance) {
      return Application._instance;
    }

    this.config = config;
    this.config.apiHost = this.config.apiHost || "localhost";
    this.config.apiPort = this.config.apiPort || "8000";

    this.database = DatabaseProvider.provide(config);
    this.server = ServerProvider.provide(config);

    Application._instance = this;
  }

  static get instance(): Application {
    return Application._instance;
  }

  async serve(): Promise<any> {
    if (!this.server || !this.config) {
      throw new Error("There was an error with configuration");
    }

    log.info(`🥩 running on ${this.config.apiHost}:${this.config.apiPort}`);
    await this.server.serve();
  }
}
