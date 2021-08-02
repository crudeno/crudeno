import { Connector, MySQLConnector } from '../../../deps.ts'
import Config from '../../config.ts'
import Connection from './connection.ts'

export class MysqlConnection implements Connection {
  constructor(protected config: Pick<Config,
    'DATABASE_HOST' |
    'DATABASE_USER' |
    'DATABASE_PASS' |
    'DATABASE_PORT' |
    'DATABASE_NAME'>) {
  }

  get(): Connector {
    return new MySQLConnector({
      database: this.config.DATABASE_NAME,
      host: this.config.DATABASE_HOST,
      username: this.config.DATABASE_USER || '',
      password: this.config.DATABASE_PASS || '',
      port: parseInt(this.config.DATABASE_PORT, 10),
    })
  }
}
