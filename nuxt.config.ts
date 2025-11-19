// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/firebase'
  ],

  // Firebase configuration
  firebase: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID
    },
    services: {
      auth: true,
      firestore: true,
      storage: true
    }
  },

  // TypeScript
  typescript: {
    strict: true
  },

  // CSS
  css: ['~/assets/css/main.css'],

  // App configuration
  app: {
    head: {
      title: 'Pharmacy Finder & Inventory Platform',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Find nearby pharmacies and check medicine availability in Morocco' }
      ]
    }
  }
})

