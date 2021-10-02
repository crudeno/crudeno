import { Context, Router as OakRouter } from '../../../deps.ts'
import { Config } from '../server.ts'

export default abstract class Router {
  protected router: OakRouter

  constructor({ path }: Pick<Config, 'path'>) {
    this.router = new OakRouter()
    this.build(this.clean(this.path({ path })))
    this.afterBuild()
  }

  get(): OakRouter {
    return this.router
  }

  protected afterBuild(): void {
    this.router.all('(.*)', async (ctx: Context): Promise<void> => {
      const [message, status] = ['The resource you are looking for does not exist', 404]
      ctx.response.status = status
      ctx.response.body = {
        error: {
          message,
          status,
        },
      }
    })
  }

  protected abstract path({ path }: Pick<Config, 'path'>): string;

  protected abstract build(path: string): void

  private clean(path: string) {
    return `/${`${path}`.replace(/^\/*/, '')}`
  }
}
