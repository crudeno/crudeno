import { Application } from '../../deps.ts'
import ServerContract from '../contracts/server.contract.ts'
import RouterFactory from './routes/factory.ts'
import Router from './routes/router.ts'

export interface Config {
  readonly host?: string;
  readonly port?: number;
  readonly path?: string;
  readonly type?: 'graphql' | 'rest';
}

export default class Server implements ServerContract {
  protected app: Application
  protected _host: string
  protected _port: number

  constructor({ host, port, path, type }: Config) {
    this.app = new Application()
    this._host = host || 'localhost'
    this._port = port || 8000

    const router: Router = RouterFactory.make({ path, type })
    this.app.use(router.get().routes())
    this.app.use(router.get().allowedMethods())
  }

  get host(): string {
    return this._host
  }

  get port(): number {
    return this._port
  }

  async serve(): Promise<void> {
    return await this.app.listen(`${this._host}:${this._port}`)
  }
}
