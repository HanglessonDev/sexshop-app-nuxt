// https://nuxt.com/docs/api/configuration/nuxt-config
import Nora from '@primevue/themes/nora'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxtjs/eslint-module',
    '@nuxt/test-utils/module',
    '@nuxtjs/supabase',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  tailwindcss: {
    config: {
      content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue'],
    },
    viewer: true,
    exposeConfig: true,
  },
  eslint: {
    lintOnStart: false,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/', '/registro'],
    },
  },
  primevue: {
    components: {
      include: '*',
    },
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
