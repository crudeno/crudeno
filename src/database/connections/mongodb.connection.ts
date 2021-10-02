import { Connector, MongoDBConnector } from '../../../deps.ts'
import Connection from './connection.ts'

export class MongodbConnection extends Connection {
  get(): Connector {
    return new MongoDBConnector({
      uri: `mongodb://${this.config.host}:${this.config.port}`,
      database: this.config.name,
    })
  }
}
