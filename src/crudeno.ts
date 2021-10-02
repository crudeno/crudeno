import { log } from '../deps.ts'
import Config from './config.ts'
import DatabaseContract from './contracts/database.contract.ts'
import ServerContract from './contracts/server.contract.ts'
import Database from './database/database.ts'
import Server from './http/server.ts'

export default class Crudeno {
  private database: DatabaseContract
  private server: ServerContract

  constructor(protected config: Config) {
    this.database = new Database(config.database)
    this.server = new Server(config.server)

    if (Crudeno._instance) {
      return Crudeno.instance
    }

    Crudeno._instance = this
  }

  private static _instance: Crudeno

  static get instance(): Crudeno {
    return Crudeno._instance
  }

  async run(): Promise<any> {
    log.info(`🥩 running on ${this.server.host}:${this.server.port}`)
    await this.server.serve()
  }
}
