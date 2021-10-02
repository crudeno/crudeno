import { Schema } from '../deps.ts'
import { Config as Database } from './database/database.ts'
import { Config as Server } from './http/server.ts'

export default interface Config {
  readonly schema: Schema
  readonly server: Server
  readonly database: Database
}
