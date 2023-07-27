// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },

  // https://github.com/nuxt/nuxt/discussions/16365
  serverHandlers: [
    {
      route: '/api/h3',
      middleware: true,
      handler: '~/sub-system/h3.ts',
    },
    {
      route: '/api/express',
      middleware: true,
      handler: '~/sub-system/express.ts',
    },
    {
      route: '/api/express-monorepo',
      middleware: true,
      handler: '@psycho-test/express',
    },
  ],
})
