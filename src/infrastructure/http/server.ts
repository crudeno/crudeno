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

    // LogMiddleware
    this.app.use(async (
      ctx: Context,
      next: () => Promise<void>,
    ): Promise<void> => {
      await next();
      const time = ctx.response.headers.get("X-Response-Time");
      log.info(
        `${ctx.request.method} ${ctx.request.url}: ${ctx.response.status} ${time}`,
      );
    });

    // TimeMiddleware
    this.app.use(async (
      ctx: Context,
      next: () => Promise<void>,
    ): Promise<void> => {
      const start = Date.now();
      await next();
      const delta = Date.now() - start;
      ctx.response.headers.set("X-Response-Time", `${delta}ms`);
    });

    this.app.addEventListener("error", (event) => log.error(event.error));
    this.app.use(this.router.get().routes());
    this.app.use(this.router.get().allowedMethods());
  }

  get router(): Router {
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
        throw new Error("Invalid api interface was given");
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
