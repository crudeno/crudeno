import Router from "../router.ts";

export default class GraphQLRouter extends Router {
  protected path: string = "/graphql";

  protected build(): void {
    this.router.post(this.path, (ctx) => {
      ctx.response.body = "GraphQL";
    });
  }
}
