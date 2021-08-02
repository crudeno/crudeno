import { Context, log } from '../../../deps.ts'

export default async (
  ctx: Context,
  next: () => Promise<void>,
): Promise<void> => {
  await next()
  const url = ctx.request.url
  const method = ctx.request.method
  const status = ctx.response.status
  const time = ctx.response.headers.get('X-Response-Time')
  if (status > 100 && status < 400) {
    log.info(`${method} ${url}: ${status} ${time}`)
  } else if (status < 500) {
    log.warning(`${method} ${url}: ${status} ${time}`)
  } else {
    const { errors } = Object.assign(
      { errors: [{ message: '' }] },
      ctx.response.body,
    )
    log.error(`${method} ${url}: ${status} ${errors[0].message} ${time}`)
  }
}
