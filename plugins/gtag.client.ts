declare global {
  interface Window {
    dataLayer: any[]
  }
}

export default defineNuxtPlugin(() => {
  window.dataLayer = window.dataLayer || []

  function gtag (...args: any[]): void {
    window.dataLayer.push(...args)
  }

  gtag('js', new Date())
  gtag('config', useRuntimeConfig().public.GTM_ID)

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${useRuntimeConfig().public.GTM_ID}`,
        async: true
      }
    ]
  })
})
