import { Database as Db } from '../../deps.ts'
import DatabaseContract from '../contracts/database.contract.ts'
import Connection from './connections/connection.ts'
import ConnectionFactory from './connections/factory.ts'

export interface Config {
  readonly type: 'mongodb' | 'mysql' | 'postegresql' | 'sqlite';
  readonly name: string;
  readonly host?: string;
  readonly port?: number;
  readonly user?: string;
  readonly pass?: string;
}

export default class Database implements DatabaseContract {
  protected database?: Db
  protected connection: Connection

  constructor(protected config: Config) {
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
