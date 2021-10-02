import { Context } from '../../../deps.ts'
import { Config } from '../server.ts'
import Router from './router.ts'

export default class GraphqlRouter extends Router {
  protected path({ path }: Pick<Config, 'path'>): string {
    return path ? path : '/graphql'
  }

  protected build(path: string): void {
    this.router.post(path, async (ctx: Context): Promise<void> => {
        ctx.response.body = 'GraphQL'
      },
    )
  }
}
