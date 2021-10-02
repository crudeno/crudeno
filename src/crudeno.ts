import { log, Schema } from '../deps.ts'
import DatabaseContract from './contracts/database.contract.ts'
import ServerContract from './contracts/server.contract.ts'

const Crudeno = (
  server: ServerContract,
  database: DatabaseContract,
) => (schema: Schema) => {
  return {
    run: async () => {
      log.info(`🥩 running on ${server.host}:${server.port}`)
      database.connect()
      await server.serve()
    },
  }
}

export default Crudeno
