import Validator from "./validator.ts";
import { RouterContext } from "../../../../../../deps.ts";

const createValidator: Validator = async (
  ctx: RouterContext,
  next: () => Promise<void>,
): Promise<void> => {
  const body = ctx.request.body({ type: "json" });
  ctx.response.body = await body.value;
  throw new Error("ERROR");
  return next();
};

export default createValidator;
