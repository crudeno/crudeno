import { RouterContext } from "../../../../../../deps.ts";

export default interface Validator {
  (ctx: RouterContext, next: () => Promise<void>): Promise<void>;
}
