import { defineNuxtPlugin, useUserSession } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  console.log('PLUGIN PARAMS', { serverRendered: nuxtApp.payload.serverRendered, prerenderAt: Boolean(nuxtApp.payload.prerenderedAt) })

  if (!nuxtApp.payload.serverRendered || Boolean(nuxtApp.payload.prerenderedAt)) {
    nuxtApp.hook('app:mounted', async () => {
      console.log('app:mounted session fetch')
      await useUserSession().fetch()
    })
  }
})
