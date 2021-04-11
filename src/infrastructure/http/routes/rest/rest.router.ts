import { plural } from "../../../../../deps.ts";
import Router from "../router.ts";
import createController from "./controllers/create.controller.ts";
import readController from "./controllers/read.controller.ts";
import updateController from "./controllers/update.controller.ts";
import deleteController from "./controllers/delete.controller.ts";
import createValidator from "./validators/create.validator.ts";
import handler from "./exceptions/handler.ts";

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
      .post(this.path, handler, createValidator, createController)
      .get(this.path, handler, readController)
      .get(`${this.path}/:id`, handler, readController)
      .put(`${this.path}/:id`, handler, updateController)
      .patch(`${this.path}/:id`, handler, updateController)
      .delete(`${this.path}/:id`, handler, deleteController);
  }
}
