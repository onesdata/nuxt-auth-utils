import { getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  event.context.sessionUrl = getQuery(event)?.sessionUrl
})
