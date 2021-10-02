import { Connector } from '../../../deps.ts'
import { Config } from '../database.ts'

export default abstract class Connection {
  constructor(protected config: Config) {
  }

  abstract get(): Connector
}
