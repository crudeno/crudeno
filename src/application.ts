import { log } from '../deps.ts'
import Config from './config.ts'
import DatabaseContract from './contracts/database.contract.ts'
import ServerContract from './contracts/server.contract.ts'
import Database from './database/database.ts'
import Server from './http/server.ts'

export default class Application {
  private database: DatabaseContract
  private server: ServerContract

  constructor(protected config: Config) {
    this.database = new Database(config)
    this.server = new Server(config)

    if (Application._instance) {
      return Application.instance
    }

    Application._instance = this
  }

  private static _instance: Application

  static get instance(): Application {
    return Application._instance
  }

  async run(): Promise<any> {
    const [host, port] = [this.config.HOST || 'localhost', this.config.PORT || 8000]
    log.info(`🥩 running on ${host}:${port}`)
    await this.server.serve(host, port)
  }
}
