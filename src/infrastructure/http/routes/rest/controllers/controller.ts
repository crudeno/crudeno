import { RouterContext } from "../../../../../../deps.ts";

export default interface Controller {
  (ctx: RouterContext, next: () => Promise<void>): Promise<void>;
}
