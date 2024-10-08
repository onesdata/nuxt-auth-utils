export default defineNuxtConfig({
  // ssr: false,
  compatibilityDate: '2024-06-17',
  devServer: {
    host: '127.0.0.1',
  },
  extends: ['@nuxt/ui-pro'],
  modules: ['../src/module', '@nuxt/ui'],
  auth: {},
  ui: {
    icons: ['simple-icons', 'gravity-ui'],
  },
  devtools: { enabled: true },
  imports: {
    autoImport: true,
  },
  routeRules: {
    '/': {
      // prerender: true,
      // swr: 5,
      // ssr: false,
    },
  },
  runtimeConfig: {
    session: {
      cookie: {
        sameSite: 'strict',
      },
    },
  },
})
