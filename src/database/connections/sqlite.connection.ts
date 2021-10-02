import { Connector, SQLite3Connector } from '../../../deps.ts'
import Connection from './connection.ts'

export class SqliteConnection extends Connection {
  get(): Connector {
    return new SQLite3Connector({
      filepath: this.config.name,
    })
  }
}
