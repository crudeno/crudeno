import { Application } from '../../deps.ts'
import Config from '../config.ts'
import ServerContract from '../contracts/server.contract.ts'
import RouterFactory from './routes/factory.ts'
import Router from './routes/router.ts'

export default class Server implements ServerContract {
  protected app: Application
  protected router: Router

  constructor(
    protected config: Pick<Config, 'API_TYPE' | 'API_PATH' | 'ENTITY'>,
  ) {
    this.router = RouterFactory.make(config)
    this.app = new Application()
    this.app.use(this.router.get().routes())
    this.app.use(this.router.get().allowedMethods())
  }

  async serve(host: string, port: number): Promise<void> {
    return await this.app.listen(`${host}:${port}`)
  }
}
