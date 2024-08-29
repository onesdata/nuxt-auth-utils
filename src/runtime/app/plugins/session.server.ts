import { defineNuxtPlugin, useUserSession } from '#imports'

export default defineNuxtPlugin({
  name: 'session-fetch-plugin',
  enforce: 'pre',
  async setup(nuxtApp) {
    if (nuxtApp.payload.serverRendered && !nuxtApp.payload.prerenderedAt) {
      await useUserSession().fetch()
    }
  },
})
