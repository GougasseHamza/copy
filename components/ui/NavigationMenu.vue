<script setup lang="ts">
import { ref } from 'vue'

interface NavItem {
  label: string
  href: string
}

interface Props {
  items?: NavItem[]
  logo?: string
  brandName?: string
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  logo: '',
  brandName: 'PharmFinder'
})

const mobileMenuOpen = ref(false)
const route = useRoute()

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<template>
  <nav class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container-custom flex h-16 items-center">
      <!-- Logo -->
      <div class="mr-4 flex">
        <NuxtLink to="/" class="flex items-center space-x-2 transition-colors hover:text-primary">
          <svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
          <span class="hidden font-bold sm:inline-block text-xl">{{ brandName }}</span>
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
          <NuxtLink
            v-for="item in items"
            :key="item.href"
            :to="item.href"
            class="transition-colors hover:text-primary text-foreground/60"
            active-class="text-foreground"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
          <NuxtLink
            to="/auth/login"
            class="hidden md:inline-flex items-center justify-center text-sm font-medium transition-colors hover:text-primary text-foreground/60"
          >
            Connexion
          </NuxtLink>
          <NuxtLink
            to="/auth/signup"
            class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            S'inscrire
          </NuxtLink>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-if="mobileMenuOpen" class="md:hidden border-t">
        <div class="space-y-1 px-4 py-3">
          <NuxtLink
            v-for="item in items"
            :key="item.href"
            :to="item.href"
            class="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent transition-colors"
            active-class="bg-accent text-foreground"
            @click="mobileMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
          <NuxtLink
            to="/auth/login"
            class="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent transition-colors"
            @click="mobileMenuOpen = false"
          >
            Connexion
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>
