import { RouterContext } from "../../../../../../deps.ts";
import Bag from "./bag.ts";
import Exception from "./exception.ts";

const handler = async (
  ctx: RouterContext,
  next: () => Promise<void>,
): Promise<void> => {
  try {
    await next();
  } catch (err) {
    if (err instanceof Bag) {
      const status = err.status;
      ctx.response.status = status;
      ctx.response.body = {
        errors: err.errors.map(({ message }) => ({ status, message })),
      };
    } else if (err instanceof Exception) {
      const { status, message } = err;
      ctx.response.status = status;
      ctx.response.body = { errors: [{ status, message }] };
    } else {
      const [status, message] = [500, "There was an error"];
      ctx.response.status = status;
      ctx.response.body = { errors: [{ status, message }] };
    }
  }
};

export default handler;
