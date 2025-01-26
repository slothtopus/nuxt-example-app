// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxthub/core'],
  vite: {
    resolve: {
      alias: {
        '@lib/ultimate-pagination':
          './lib/ultimate-pagination/ultimate-pagination.ts',
      },
    },
  },
});
