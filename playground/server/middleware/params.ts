import { getQuery } from 'h3'
import { setSessionOverrides } from '#imports'

export default defineEventHandler(async (event) => {
  setSessionOverrides({
    sessionPassword: getQuery(event)?.sessionPassword as string,
  })
})
