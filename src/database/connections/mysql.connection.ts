import { Connector, MySQLConnector } from '../../../deps.ts'
import Connection from './connection.ts'

export class MysqlConnection extends Connection {
  get(): Connector {
    return new MySQLConnector({
      database: this.config.name,
      host: this.config.host || 'localhost',
      username: this.config.user || '',
      password: this.config.pass || '',
      port: this.config.port,
    })
  }
}
