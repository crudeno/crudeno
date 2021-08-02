import Config from '../../config.ts'
import Connection from './connection.ts'
import { MongodbConnection } from './mongodb.connection.ts'
import { MysqlConnection } from './mysql.connection.ts'
import { PostgresqlConnection } from './postgresql.connection.ts'
import { SqliteConnection } from './sqlite.connection.ts'

export default class ConnectionFactory {
  static make(config: Pick<Config,
    'DATABASE_TYPE' |
    'DATABASE_HOST' |
    'DATABASE_NAME' |
    'DATABASE_PATH' |
    'DATABASE_PORT' |
    'DATABASE_PASS' |
    'DATABASE_USER'>): Connection {
    switch (config.DATABASE_TYPE) {
      case 'mongodb':
        return new MongodbConnection(config)
      case 'mysql':
        return new MysqlConnection(config)
      case'postegresql':
        return new PostgresqlConnection(config)
      case 'sqlite':
        return new SqliteConnection(config)
    }
  }
}
