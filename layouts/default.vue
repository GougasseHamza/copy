<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation (hidden on homepage) -->
    <nav v-if="route.path !== '/'" class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container-custom flex h-16 items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
          <span class="text-xl font-bold">PharmFinder</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/pharmacies" class="text-sm font-medium transition-colors hover:text-primary">
            Pharmacies
          </NuxtLink>
          <NuxtLink to="/products" class="text-sm font-medium transition-colors hover:text-primary">
            Produits
          </NuxtLink>
          <NuxtLink to="/chatbot" class="text-sm font-medium transition-colors hover:text-primary">
            Assistant
          </NuxtLink>
          <NuxtLink to="/staff" class="text-sm font-medium transition-colors hover:text-primary">
            Personnel
          </NuxtLink>
        </div>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
          <NuxtLink to="/auth/login" class="hidden md:inline-flex items-center justify-center text-sm font-medium transition-colors hover:text-primary">
            Connexion
          </NuxtLink>
          <NuxtLink to="/auth/signup" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
            S'inscrire
          </NuxtLink>
          
          <!-- Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t">
        <div class="space-y-1 px-4 py-3">
          <NuxtLink to="/pharmacies" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent" @click="mobileMenuOpen = false">
            Pharmacies
          </NuxtLink>
          <NuxtLink to="/products" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent" @click="mobileMenuOpen = false">
            Produits
          </NuxtLink>
          <NuxtLink to="/chatbot" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent" @click="mobileMenuOpen = false">
            Assistant
          </NuxtLink>
          <NuxtLink to="/staff" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent" @click="mobileMenuOpen = false">
            Personnel
          </NuxtLink>
          <NuxtLink to="/auth/login" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent" @click="mobileMenuOpen = false">
            Connexion
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t mt-20">
      <div class="container-custom py-8 md:py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">PharmFinder</h3>
            <p class="text-sm text-muted-foreground">
              Trouvez les pharmacies près de chez vous et vérifiez la disponibilité des médicaments en temps réel.
            </p>
          </div>
          <div>
            <h4 class="text-sm font-semibold mb-4">Navigation</h4>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li><NuxtLink to="/pharmacies" class="hover:text-primary">Pharmacies</NuxtLink></li>
              <li><NuxtLink to="/products" class="hover:text-primary">Produits</NuxtLink></li>
              <li><NuxtLink to="/chatbot" class="hover:text-primary">Assistant</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold mb-4">Support</h4>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" class="hover:text-primary">FAQ</a></li>
              <li><a href="#" class="hover:text-primary">Contact</a></li>
              <li><a href="#" class="hover:text-primary">Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold mb-4">Suivez-nous</h4>
            <div class="flex space-x-4">
              <a href="#" class="text-muted-foreground hover:text-primary">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" class="text-muted-foreground hover:text-primary">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 PharmFinder. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
const route = useRoute()

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>
