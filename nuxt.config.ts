// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      GTM_ID: process.env.GTM_ID || ''
    }
  },
})
