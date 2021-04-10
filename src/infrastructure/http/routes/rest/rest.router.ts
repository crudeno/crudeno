import { plural } from "../../../../../deps.ts";
import Router from "../router.ts";
import createController from "./controllers/create.controller.ts";
import readController from "./controllers/read.controller.ts";
import updateController from "./controllers/update.controller.ts";
import deleteController from "./controllers/delete.controller.ts";
import createValidator from "./validators/create.validator.ts";

export default class RestRouter extends Router {
  private readonly entityName: string | undefined;
  private readonly prefix: string | undefined;

  constructor(entityName?: string, prefix?: string) {
    super();
    this.entityName = entityName ? entityName.toLowerCase() : entityName;
    this.prefix = prefix ? prefix.toLowerCase() : prefix;
    this.path = `${this.prefix ? `/${this.prefix}` : ""}/${
      this.entityName ? plural(this.entityName).replaceAll("_", "-") : ""
    }`;
  }

  protected build(): void {
    this.router
      .post(this.path, createValidator, createController)
      .get(this.path, readController)
      .get(`${this.path}/:id`, readController)
      .put(`${this.path}/:id`, updateController)
      .patch(`${this.path}/:id`, updateController)
      .delete(`${this.path}/:id`, deleteController);
  }
}
