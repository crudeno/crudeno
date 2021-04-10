import { RouterContext } from "../../../../../../deps.ts";
import Controller from "./controller.ts";

const readController: Controller = async (
  ctx: RouterContext,
  next: () => Promise<void>,
): Promise<void> => {
  ctx.response.body = ctx.params.id ? "READ ONE" : "READ MANY";
  ctx.response.status = 200;
};

export default readController;
