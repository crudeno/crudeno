import { Connector, SQLite3Connector } from '../../../deps.ts'
import Config from '../../config.ts'
import Connection from './connection.ts'

export class SqliteConnection implements Connection {
  constructor(protected config: Pick<Config, 'DATABASE_PATH'>) {
  }

  get(): Connector {
    if (!this.config.DATABASE_PATH) {
      throw new Error('Please provide a valid SQLite database path')
    }

    return new SQLite3Connector({
      filepath: this.config.DATABASE_PATH,
    })
  }
}
