// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      style: [
        {
          children:
            "body { margin: 0; padding: 0; min-height: 100vh; min-height: -webkit-fill-available;}",
        },
      ],
    },
  },
})
