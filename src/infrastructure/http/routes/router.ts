import { Router as OakRouter } from "../../../../deps.ts";

export default abstract class Router {
  protected router: OakRouter;
  protected path: string = "";

  constructor() {
    this.router = new OakRouter();
  }

  get(): OakRouter {
    this.beforeBuild();
    this.build();
    this.afterBuild();
    return this.router;
  }

  protected beforeBuild(): void {
  }

  protected afterBuild(): void {
    this.router.all("/(.*)", async (ctx) => {
      ctx.response.status = 404;
      ctx.response.body = {
        error: {
          message: "The resource you are looking for does not exist.",
          status: 404,
        },
      };
    });
  }

  protected abstract build(): void;
}
