import { Context } from '../../../deps.ts'
import Config from '../../config.ts'
import Router from './router.ts'

export default class GraphqlRouter extends Router {
  protected path({ API_PATH }: Pick<Config, 'API_PATH'>): string {
    return API_PATH ? API_PATH : '/graphql'
  }

  protected build(path: string): void {
    this.router.post(path, async (ctx: Context): Promise<void> => {
        ctx.response.body = 'GraphQL'
      },
    )
  }
}
