import { Database as Db } from '../../deps.ts'
import Config from '../config.ts'
import DatabaseContract from '../contracts/database.contract.ts'
import Connection from './connections/connection.ts'
import ConnectionFactory from './connections/factory.ts'

export default class Database implements DatabaseContract {
  protected database?: Db
  protected connection: Connection

  constructor(protected config: Pick<Config,
    'DATABASE_TYPE' |
    'DATABASE_HOST' |
    'DATABASE_NAME' |
    'DATABASE_PATH' |
    'DATABASE_PORT' |
    'DATABASE_PASS' |
    'DATABASE_USER'>) {
    this.connection = ConnectionFactory.make(config)
  }

  connect(): Db {
    if (this.database) {
      return this.database
    }

    this.database = new Db(this.connection.get())

    return this.connect()
  }
}
