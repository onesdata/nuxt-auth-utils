import { eventHandler } from 'h3'
import { clearUserSession } from '../utils/session'

export default eventHandler(async (event) => {
  event.node.res.setHeader('Cache-Control', 'no-store')

  await clearUserSession(event)

  console.log('---> SERVER: SESSION DELETE')

  return { loggedOut: true }
})
