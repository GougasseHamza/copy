<template>
  <NuxtLayout name="default">
    <div class="min-h-screen bg-gradient-to-br from-beige-50 via-white to-nature-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <!-- Hero Section -->
      <section class="relative py-20 overflow-hidden">
        <div class="container-custom relative z-10">
          <div class="text-center max-w-3xl mx-auto">
            <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-nature-600 via-nature-500 to-nature-400 bg-clip-text text-transparent">
              Recherche de Médicaments
            </h1>
            <p class="text-xl text-beige-600 dark:text-beige-400 mb-8">
              Trouvez rapidement les médicaments dont vous avez besoin
            </p>

            <!-- Search Bar -->
            <div class="relative max-w-2xl mx-auto">
              <input
                v-model="searchQuery"
                @input="handleSearch"
                type="text"
                placeholder="Rechercher un médicament (ex: Doliprane, Atorva...)"
                class="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-nature-200 dark:border-nature-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-nature-500 focus:ring-4 focus:ring-nature-500/20 transition-all text-lg shadow-lg"
              />
              <svg
                class="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-nature-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <!-- Search hint -->
            <p class="mt-4 text-sm text-beige-500 dark:text-beige-500">
              💡 Essayez: "Paracétamol", "Ibuprofène", "Atorva", "Doliprane"
            </p>
          </div>
        </div>

        <!-- Decorative elements -->
        <div class="absolute inset-0 pointer-events-none opacity-30">
          <div class="absolute top-20 left-10 w-72 h-72 bg-nature-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div class="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </div>
      </section>

      <!-- Loading State -->
      <div v-if="isLoading" class="container-custom py-20">
        <div class="flex flex-col items-center justify-center">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-nature-500 border-t-transparent"></div>
          <p class="mt-4 text-beige-600 dark:text-beige-400">Recherche en cours...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="container-custom py-20">
        <div class="max-w-md mx-auto bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
          <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">Erreur de chargement</h3>
          <p class="text-red-600 dark:text-red-300 mb-4">{{ error }}</p>
          <button
            @click="retrySearch"
            class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>

      <!-- Empty State (No Search Yet) -->
      <div v-else-if="!searchQuery && products.length === 0" class="container-custom py-20">
        <div class="text-center max-w-md mx-auto">
          <svg class="w-24 h-24 text-beige-300 dark:text-beige-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 class="text-2xl font-semibold text-beige-800 dark:text-beige-200 mb-3">
            Recherchez un médicament
          </h3>
          <p class="text-beige-600 dark:text-beige-400">
            Utilisez la barre de recherche ci-dessus pour trouver le médicament dont vous avez besoin
          </p>
        </div>
      </div>

      <!-- No Results State -->
      <div v-else-if="searchQuery && products.length === 0 && !isLoading" class="container-custom py-20">
        <div class="text-center max-w-md mx-auto">
          <svg class="w-24 h-24 text-beige-300 dark:text-beige-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-2xl font-semibold text-beige-800 dark:text-beige-200 mb-3">
            Aucun résultat trouvé
          </h3>
          <p class="text-beige-600 dark:text-beige-400 mb-2">
            Aucun médicament ne correspond à "{{ searchQuery }}"
          </p>
          <p class="text-sm text-beige-500 dark:text-beige-500">
            Essayez une autre recherche ou vérifiez l'orthographe
          </p>
        </div>
      </div>

      <!-- Products Grid -->
      <section v-else class="container-custom pb-20">
        <div class="mb-8">
          <p class="text-beige-600 dark:text-beige-400">
            {{ products.length }} résultat{{ products.length > 1 ? 's' : '' }} pour "{{ searchQuery }}"
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="product in products"
            :key="product.id"
            class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-nature-500 cursor-pointer"
            @click="selectProduct(product)"
          >
            <!-- Product Image -->
            <div class="relative h-48 bg-gradient-to-br from-nature-100 to-blue-100 dark:from-nature-900 dark:to-blue-900 overflow-hidden">
              <img
                v-if="product.image"
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div v-else class="flex items-center justify-center h-full">
                <svg class="w-16 h-16 text-nature-300 dark:text-nature-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>

              <!-- Stock Badge -->
              <div class="absolute top-3 right-3">
                <span
                  v-if="product.stock > 50"
                  class="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg"
                >
                  En stock
                </span>
                <span
                  v-else-if="product.stock > 0"
                  class="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full shadow-lg"
                >
                  Stock limité
                </span>
                <span
                  v-else
                  class="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-lg"
                >
                  Rupture
                </span>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-5">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-nature-600 dark:group-hover:text-nature-400 transition-colors">
                {{ product.name }}
              </h3>

              <p v-if="product.description" class="text-sm text-beige-600 dark:text-beige-400 mb-3 line-clamp-2">
                {{ product.description }}
              </p>

              <!-- Category -->
              <span
                v-if="product.category"
                class="inline-block px-3 py-1 bg-nature-100 dark:bg-nature-900 text-nature-700 dark:text-nature-300 text-xs font-medium rounded-full mb-3"
              >
                {{ product.category }}
              </span>

              <!-- Price -->
              <div class="flex items-center justify-between mt-auto pt-3 border-t border-beige-100 dark:border-gray-700">
                <div>
                  <span class="text-2xl font-bold text-nature-600 dark:text-nature-400">
                    {{ product.price }} Dhs
                  </span>
                </div>
                <button class="px-4 py-2 bg-nature-500 hover:bg-nature-600 text-white rounded-lg transition-colors text-sm font-medium">
                  Voir détails
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Detail Modal -->
      <Teleport to="body">
        <div
          v-if="selectedProduct"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <!-- Modal Header -->
            <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-beige-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                Détails du produit
              </h2>
              <button
                @click="closeModal"
                class="p-2 hover:bg-beige-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Modal Content -->
            <div class="p-6">
              <!-- Product Image -->
              <div class="relative h-64 bg-gradient-to-br from-nature-100 to-blue-100 dark:from-nature-900 dark:to-blue-900 rounded-2xl overflow-hidden mb-6">
                <img
                  v-if="selectedProduct.image"
                  :src="selectedProduct.image"
                  :alt="selectedProduct.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="flex items-center justify-center h-full">
                  <svg class="w-24 h-24 text-nature-300 dark:text-nature-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>

              <!-- Product Info -->
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {{ selectedProduct.name }}
              </h3>

              <div class="space-y-4 mb-6">
                <!-- Category -->
                <div v-if="selectedProduct.category" class="flex items-center gap-2">
                  <span class="font-semibold text-beige-700 dark:text-beige-300">Catégorie:</span>
                  <span class="px-3 py-1 bg-nature-100 dark:bg-nature-900 text-nature-700 dark:text-nature-300 text-sm font-medium rounded-full">
                    {{ selectedProduct.category }}
                  </span>
                </div>

                <!-- Description -->
                <div v-if="selectedProduct.description">
                  <span class="font-semibold text-beige-700 dark:text-beige-300 block mb-2">Description:</span>
                  <p class="text-beige-600 dark:text-beige-400">
                    {{ selectedProduct.description }}
                  </p>
                </div>

                <!-- Uses -->
                <div v-if="selectedProduct.uses">
                  <span class="font-semibold text-beige-700 dark:text-beige-300 block mb-2">Utilisation:</span>
                  <p class="text-beige-600 dark:text-beige-400">
                    {{ selectedProduct.uses }}
                  </p>
                </div>

                <!-- Disclaimer -->
                <div v-if="selectedProduct.disclaimer" class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
                  <p class="text-yellow-800 dark:text-yellow-300 text-sm">
                    ⚠️ {{ selectedProduct.disclaimer }}
                  </p>
                </div>

                <!-- Stock -->
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-beige-700 dark:text-beige-300">Stock:</span>
                  <span class="text-beige-600 dark:text-beige-400">
                    {{ selectedProduct.stock }} unités disponibles
                  </span>
                </div>
              </div>

              <!-- Price and Actions -->
              <div class="border-t border-beige-100 dark:border-gray-700 pt-6">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <p class="text-sm text-beige-600 dark:text-beige-400 mb-1">Prix</p>
                    <p class="text-4xl font-bold text-nature-600 dark:text-nature-400">
                      {{ selectedProduct.price }} Dhs
                    </p>
                  </div>
                </div>

                <button
                  @click="checkAvailability"
                  class="w-full px-6 py-3 bg-nature-500 hover:bg-nature-600 text-white rounded-xl transition-colors font-semibold flex items-center justify-center gap-2"
                  :disabled="checkingAvailability"
                >
                  <svg v-if="!checkingAvailability" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span v-if="!checkingAvailability">Vérifier la disponibilité à proximité</span>
                  <span v-else>Vérification...</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Product } from '~/data/mockData'

// SEO
useHead({
  title: 'Recherche de Médicaments - PharmFinder',
  meta: [
    { name: 'description', content: 'Recherchez et trouvez les médicaments dont vous avez besoin dans les pharmacies à proximité' }
  ]
})

// API composable
const api = useApi()

// State
const searchQuery = ref('')
const products = ref<Product[]>([])
const selectedProduct = ref<Product | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const checkingAvailability = ref(false)

// Debounce timer
let searchTimeout: NodeJS.Timeout | null = null

// Handle search with debounce
const handleSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  if (!searchQuery.value.trim()) {
    products.value = []
    return
  }

  searchTimeout = setTimeout(async () => {
    await performSearch()
  }, 500) // 500ms debounce
}

// Perform the actual search
const performSearch = async () => {
  if (!searchQuery.value.trim()) {
    products.value = []
    return
  }

  isLoading.value = true
  error.value = null

  try {
    const response = await api.searchProducts(searchQuery.value, 50)
    products.value = response.data || []
  } catch (err: any) {
    error.value = err.message || 'Erreur lors de la recherche'
    console.error('Search failed:', err)
  } finally {
    isLoading.value = false
  }
}

// Retry search
const retrySearch = () => {
  error.value = null
  performSearch()
}

// Select a product to view details
const selectProduct = (product: Product) => {
  selectedProduct.value = product
}

// Close modal
const closeModal = () => {
  selectedProduct.value = null
  checkingAvailability.value = false
}

// Check product availability at nearby pharmacies
const checkAvailability = async () => {
  if (!selectedProduct.value) return

  checkingAvailability.value = true

  try {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await api.checkProductAvailability(
              selectedProduct.value!.id,
              position.coords.latitude,
              position.coords.longitude
            )

            // Handle availability response
            if (response.data && response.data.pharmacies) {
              alert(`Disponible dans ${response.data.pharmacies.length} pharmacies à proximité`)
            } else {
              alert('Aucune pharmacie trouvée à proximité avec ce produit')
            }
          } catch (err: any) {
            alert('Erreur lors de la vérification de disponibilité')
            console.error('Availability check failed:', err)
          } finally {
            checkingAvailability.value = false
          }
        },
        () => {
          alert('Veuillez activer la géolocalisation pour vérifier la disponibilité')
          checkingAvailability.value = false
        }
      )
    } else {
      alert('La géolocalisation n\'est pas supportée par votre navigateur')
      checkingAvailability.value = false
    }
  } catch (err) {
    console.error('Error checking availability:', err)
    checkingAvailability.value = false
  }
}

// Cleanup on unmount
onUnmounted(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
})
</script>

<style scoped>
/* Animation for blobs */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
