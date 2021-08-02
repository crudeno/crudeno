import { Context } from '../../../deps.ts'

export default () => async (
  ctx: Context,
  next: () => Promise<void>,
): Promise<void> => {
  const start = Date.now()
  await next()
  const delta = Date.now() - start
  ctx.response.headers.set('X-Response-Time', `${delta}ms`)
}
