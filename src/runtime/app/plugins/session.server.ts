import { defineNuxtPlugin, useRequestEvent, useUserSession } from '#imports'

export default defineNuxtPlugin({
  name: 'session-fetch-plugin',
  enforce: 'pre',
  async setup(nuxtApp) {
    console.log('---> SERVER - IS CACHED', Boolean(useRequestEvent()?.context.cache))

    if (nuxtApp.payload.serverRendered && !nuxtApp.payload.prerenderedAt) {
      await useUserSession().fetch()
    }
  },
})
