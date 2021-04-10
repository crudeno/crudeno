import { RouterContext } from "../../../../../../deps.ts";
import Controller from "./controller.ts";

const updateController: Controller = async (
  ctx: RouterContext,
  next: () => Promise<void>,
): Promise<void> => {
  ctx.response.body = ctx.request.method === "PATCH" ? "UPDATE" : "REPLACE";
  ctx.response.status = 200;
};

export default updateController;
