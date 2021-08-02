import Config from '../../config.ts'
import GraphqlRouter from './graphql.router.ts'
import RestRouter from './rest.router.ts'
import Router from './router.ts'

export default class RouterFactory {
  static make(config: Pick<Config, 'API_TYPE' | 'API_PATH' | 'ENTITY'>): Router {
    switch (config.API_TYPE) {
      case 'graphql':
        return new GraphqlRouter(config)
      case 'rest':
      default:
        return new RestRouter(config)
    }
  }
}
