import { eventHandler } from 'h3'
import { clearUserSession } from '../utils/session'

export default eventHandler(async (event) => {
  event.res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  event.res.setHeader('Pragma', 'no-cache')
  event.res.setHeader('Expires', '0')

  await clearUserSession(event)

  return { loggedOut: true }
})
