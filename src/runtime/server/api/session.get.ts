import { eventHandler } from 'h3'
import { getUserSession, sessionHooks } from '../utils/session'
import type { UserSessionRequired } from '#auth-utils'

export default eventHandler(async (event) => {
  event.node.res.setHeader('Cache-Control', 'no-store')

  const session = await getUserSession(event)

  console.log('---> SERVER: SESSION GET')

  if (session.user) {
    await sessionHooks.callHookParallel('fetch', session as UserSessionRequired, event)
  }

  return session
})
