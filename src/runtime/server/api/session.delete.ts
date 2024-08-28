import { eventHandler } from 'h3'
import { clearUserSession } from '../utils/session'

export default eventHandler(async (event) => {
  await clearUserSession(event)

  console.log('---> SERVER: SESSION DELETE')

  return { loggedOut: true }
})
