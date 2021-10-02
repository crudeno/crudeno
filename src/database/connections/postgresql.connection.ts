import { Connector, PostgresConnector } from '../../../deps.ts'
import Connection from './connection.ts'

export class PostgresqlConnection extends Connection {
  get(): Connector {
    return new PostgresConnector({
      database: this.config.name,
      host: this.config.host || 'localhost',
      username: this.config.user || '',
      password: this.config.pass || '',
      port: this.config.port,
    })
  }
}
