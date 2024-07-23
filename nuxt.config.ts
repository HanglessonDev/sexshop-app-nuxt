// https://nuxt.com/docs/api/configuration/nuxt-config
import Nora from '@primevue/themes/nora'

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxtjs/eslint-module',
    '@nuxt/test-utils/module',
  ],

  primevue: {
    options: {
      theme: {
        preset: Nora,
        options: {
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities',
          },
        },
      },
      ripple: true,
    },
    autoImport: true,
  },

  compatibilityDate: '2024-07-16',
})
