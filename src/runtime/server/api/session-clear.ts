import { eventHandler } from 'h3'
import { clearAllSessions } from '../utils/session'

export default eventHandler(async (event) => {
  event.node.res.setHeader('Cache-Control', 'no-store')

  await clearAllSessions(event)

  return { cleared: true }
})
