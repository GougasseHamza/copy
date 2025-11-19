<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// Main app component - Nuxt 3 entry point
useHead({
  titleTemplate: '%s | PharmFinder',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Find nearby pharmacies and check medicine availability in Morocco' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>

<style>
/* Global styles are imported in nuxt.config.ts */
</style>
