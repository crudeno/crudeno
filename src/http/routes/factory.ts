import { Config } from '../server.ts'
import GraphqlRouter from './graphql.router.ts'
import RestRouter from './rest.router.ts'
import Router from './router.ts'

export default class RouterFactory {
  static make({ path, type }: Pick<Config, 'path' | 'type'>): Router {
    switch (type) {
      case 'graphql':
        return new GraphqlRouter({ path })
      case 'rest':
      default:
        return new RestRouter({ path })
    }
  }
}
