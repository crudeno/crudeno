import { RouterContext } from '../../../../deps.ts'
import Controller from './controller.ts'

const deleteController: Controller = async (
  ctx: RouterContext,
  next: () => Promise<void>,
): Promise<void> => {
  ctx.response.body = 'DELETE'
  ctx.response.status = 204
}

export default deleteController
