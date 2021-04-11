import ServerContract from "../../contracts/server.ts";
import GraphQLRouter from "./routes/graphql/graphql.router.ts";
import RestRouter from "./routes/rest/rest.router.ts";
import Router from "./routes/router.ts";
import { Application, Context, log } from "../../../deps.ts";

export default class Server extends ServerContract {
  private app: Application | undefined;
  private _router: Router | undefined;

  protected build(): void {
    this.app = new Application();
    this.app.use(this.schema);
    this.app.use(this.time);
    this.app.use(this.log);
    this.app.use(this.router.get().routes());
    this.app.use(this.router.get().allowedMethods());
  }

  private get schema(): (
    ctx: Context,
    next: () => Promise<void>,
  ) => Promise<void> {
    return async (
      ctx: Context,
      next: () => Promise<void>,
    ): Promise<void> => {
      ctx.state.schema = this.config.schema;
      await next();
    };
  }

  private get time(): (
    ctx: Context,
    next: () => Promise<void>,
  ) => Promise<void> {
    return async (
      ctx: Context,
      next: () => Promise<void>,
    ): Promise<void> => {
      const start = Date.now();
      await next();
      const delta = Date.now() - start;
      ctx.response.headers.set("X-Response-Time", `${delta}ms`);
    };
  }

  private get log(): (
    ctx: Context,
    next: () => Promise<void>,
  ) => Promise<void> {
    return async (
      ctx: Context,
      next: () => Promise<void>,
    ): Promise<void> => {
      await next();
      const url = ctx.request.url;
      const method = ctx.request.method;
      const status = ctx.response.status;
      const time = ctx.response.headers.get("X-Response-Time");
      if (status > 100 && status < 400) {
        log.info(`${method} ${url}: ${status} ${time}`);
      } else if (status < 500) {
        log.warning(`${method} ${url}: ${status} ${time}`);
      } else {
        const { errors } = Object.assign(
          { errors: [{ message: "" }] },
          ctx.response.body,
        );
        log.error(`${method} ${url}: ${status} ${errors[0].message} ${time}`);
      }
    };
  }

  private get router(): Router {
    if (this._router) {
      return this._router;
    }

    switch (this.config.apiInterface) {
      case "graphql":
        this._router = new GraphQLRouter();
        break;

      case "rest":
        this._router = new RestRouter(
          this.config.entity,
          this.config.apiPrefix,
        );
        break;

      default:
        throw new Error("Invalid api interface given");
    }

    return this.router;
  }

  async serve(): Promise<any> {
    if (!this.app) {
      throw new Error("The server is not well configured");
    }

    return await this.app.listen(
      `${this.config.apiHost}:${this.config.apiPort}`,
    );
  }
}
