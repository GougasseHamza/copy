<template>
  <NuxtLayout name="default">
    <div class="container-custom py-8">
      <h1 class="text-4xl font-bold mb-8">Pharmacy Details</h1>
      <p>Pharmacy ID: {{ $route.params.id }}</p>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
</script>
