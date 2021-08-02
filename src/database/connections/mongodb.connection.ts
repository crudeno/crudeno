import { Connector, MongoDBConnector } from '../../../deps.ts'
import Config from '../../config.ts'
import Connection from './connection.ts'

export class MongodbConnection implements Connection {
  constructor(protected config: Pick<Config, 'DATABASE_HOST' | 'DATABASE_PORT' | 'DATABASE_NAME'>) {
  }

  get(): Connector {
    return new MongoDBConnector({
      uri: `mongodb://${this.config.DATABASE_HOST}:${this.config.DATABASE_PORT}`,
      database: this.config.DATABASE_NAME,
    })
  }
}
