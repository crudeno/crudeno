import { RouterContext } from "../../../../../../deps.ts";
import ValidationException from "./validation.exception.ts";

const handler = async (
  ctx: RouterContext,
  next: () => Promise<void>,
): Promise<void> => {
  try {
  } catch (err) {
    if (err instanceof ValidationException) {
    } else {
    }
  }
};
