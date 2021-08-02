import { Connector } from '../../../deps.ts'

export default interface Connection {
  get(): Connector
}
