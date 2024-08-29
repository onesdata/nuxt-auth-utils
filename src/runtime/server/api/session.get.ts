import { eventHandler } from 'h3'
import { getUserSession, sessionHooks } from '../utils/session'
import type { UserSessionRequired } from '#auth-utils'

export default eventHandler(async (event) => {
  event.res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  event.res.setHeader('Pragma', 'no-cache')
  event.res.setHeader('Expires', '0')

  const session = await getUserSession(event)

  if (session.user) {
    await sessionHooks.callHookParallel('fetch', session as UserSessionRequired, event)
  }

  return session
})
