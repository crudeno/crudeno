import { RouterContext } from "../../../../../../deps.ts";
import Controller from "./controller.ts";

const createController: Controller = async (
  ctx: RouterContext,
  next: () => Promise<void>,
): Promise<void> => {
  ctx.response.body = "CREATE";
  ctx.response.status = 201;
};

export default createController;
