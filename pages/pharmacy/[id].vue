<template>
  <NuxtLayout name="default">
    <!-- Loading State -->
    <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-nature-500 border-t-transparent mx-auto"></div>
        <p class="mt-4 text-beige-600 dark:text-beige-400">Chargement...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container-custom py-20">
      <div class="max-w-md mx-auto bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">Erreur</h3>
        <p class="text-red-600 dark:text-red-300 mb-4">{{ error }}</p>
        <button
          @click="router.push('/pharmacies')"
          class="px-6 py-2 bg-nature-600 hover:bg-nature-700 text-white rounded-lg transition-colors"
        >
          Retour aux pharmacies
        </button>
      </div>
    </div>

    <!-- Pharmacy Detail -->
    <div v-else-if="pharmacy" class="min-h-screen bg-gradient-to-br from-beige-50 via-white to-nature-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <!-- Pharmacy Header -->
      <section class="relative py-12 overflow-hidden bg-gradient-to-br from-nature-700 via-earth-600 to-beige-700">
        <div class="container-custom relative z-10">
          <div class="grid md:grid-cols-3 gap-8 items-start">
            <!-- Pharmacy Image -->
            <div class="md:col-span-1">
              <div class="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  v-if="pharmacy.image"
                  :src="pharmacy.image"
                  :alt="pharmacy.name"
                  class="w-full h-64 object-cover"
                />
                <div v-else class="w-full h-64 bg-beige-200 dark:bg-beige-700 flex items-center justify-center">
                  <svg class="w-24 h-24 text-beige-400 dark:text-beige-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Pharmacy Info -->
            <div class="md:col-span-2">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">{{ pharmacy.name }}</h1>
                  <div class="flex items-center gap-2 mb-3">
                    <span
                      :class="[
                        'px-4 py-1.5 rounded-full text-sm font-bold',
                        pharmacy.isOpen
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      ]"
                    >
                      {{ pharmacy.isOpen ? 'Ouverte' : 'Fermée' }}
                    </span>
                    <div class="flex items-center gap-1">
                      <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span class="text-white font-bold">{{ pharmacy.rating }}</span>
                      <span class="text-white/80 text-sm">({{ pharmacy.reviewCount }} avis)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-3 text-white/90">
                <div class="flex items-start gap-3">
                  <svg class="h-6 w-6 text-beige-200 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <div>
                    <p class="font-medium">{{ pharmacy.address }}</p>
                    <p class="text-white/70">{{ pharmacy.city }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <svg class="h-6 w-6 text-beige-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <a :href="`tel:${pharmacy.phone}`" class="font-medium hover:text-white transition-colors">{{ pharmacy.phone }}</a>
                </div>

                <div v-if="pharmacy.distance" class="flex items-center gap-3">
                  <svg class="h-6 w-6 text-beige-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                  <p class="font-medium">{{ pharmacy.distance }} km de vous</p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-3 mt-6">
                <a
                  :href="`tel:${pharmacy.phone}`"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-white text-nature-600 rounded-xl font-semibold hover:bg-beige-50 transition-all duration-300 shadow-lg"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  Appeler
                </a>
                <button
                  @click="getDirections"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-earth-500 text-white rounded-xl font-semibold hover:bg-earth-600 transition-all duration-300 shadow-lg"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                  </svg>
                  Itinéraire
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Inventory Section -->
      <section class="container-custom py-12">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-beige-900 dark:text-beige-50 mb-4">Inventaire des Médicaments</h2>

          <!-- Search and Filter -->
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 relative">
              <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-beige-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher un médicament..."
                class="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-beige-200 dark:border-beige-700 bg-white dark:bg-beige-800/50 text-beige-900 dark:text-beige-50 placeholder-beige-400 focus:outline-none focus:border-nature-500 focus:ring-4 focus:ring-nature-500/10 transition-all"
              />
            </div>
            <select
              v-model="selectedCategory"
              class="px-6 py-3 rounded-xl border-2 border-beige-200 dark:border-beige-700 bg-white dark:bg-beige-800/50 text-beige-900 dark:text-beige-50 focus:outline-none focus:border-nature-500 focus:ring-4 focus:ring-nature-500/10 transition-all cursor-pointer"
            >
              <option value="">Toutes catégories</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
        </div>

        <!-- Loading Inventory -->
        <div v-if="loadingInventory" class="flex flex-col items-center justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-nature-500 border-t-transparent"></div>
          <p class="mt-4 text-beige-600 dark:text-beige-400">Chargement de l'inventaire...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredInventory.length === 0" class="text-center py-20">
          <svg class="w-24 h-24 text-beige-300 dark:text-beige-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-2xl font-semibold text-beige-800 dark:text-beige-200 mb-3">
            Aucun produit trouvé
          </h3>
          <p class="text-beige-600 dark:text-beige-400">
            {{ searchQuery ? `Aucun médicament ne correspond à "${searchQuery}"` : 'Cette pharmacie n\'a pas encore d\'inventaire' }}
          </p>
        </div>

        <!-- Inventory Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="product in filteredInventory"
            :key="product.id"
            class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-nature-500"
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

              <!-- Price and Stock -->
              <div class="flex items-center justify-between pt-3 border-t border-beige-100 dark:border-gray-700">
                <div>
                  <span class="text-2xl font-bold text-nature-600 dark:text-nature-400">
                    {{ product.price }} Dhs
                  </span>
                </div>
                <div class="text-right">
                  <p class="text-xs text-beige-500 dark:text-beige-400">Stock</p>
                  <p class="text-sm font-semibold text-beige-900 dark:text-beige-50">{{ product.stock }} unités</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Pharmacy, Product } from '~/data/mockData'

const route = useRoute()
const router = useRouter()
const api = useApi()

// State
const pharmacy = ref<Pharmacy | null>(null)
const inventory = ref<Product[]>([])
const isLoading = ref(true)
const loadingInventory = ref(true)
const error = ref<string | null>(null)
const searchQuery = ref('')
const selectedCategory = ref('')
const categories = ref<string[]>([])

// Fetch pharmacy details
const fetchPharmacy = async () => {
  try {
    isLoading.value = true
    const pharmacyId = route.params.id as string
    pharmacy.value = await api.getPharmacyById(pharmacyId)
  } catch (err: any) {
    error.value = err.message || 'Impossible de charger les détails de la pharmacie'
    console.error('Error fetching pharmacy:', err)
  } finally {
    isLoading.value = false
  }
}

// Fetch inventory
const fetchInventory = async () => {
  try {
    loadingInventory.value = true
    const pharmacyId = route.params.id as string
    const response = await api.getPharmacyInventory(pharmacyId)
    inventory.value = response.data || []

    // Extract unique categories
    const uniqueCategories = [...new Set(inventory.value.map(p => p.category).filter(Boolean))]
    categories.value = uniqueCategories as string[]
  } catch (err: any) {
    console.error('Error fetching inventory:', err)
    // Don't show error for inventory, just keep it empty
    inventory.value = []
  } finally {
    loadingInventory.value = false
  }
}

// Filtered inventory
const filteredInventory = computed(() => {
  let filtered = [...inventory.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.category?.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }

  return filtered
})

// Get directions
const getDirections = () => {
  if (pharmacy.value && typeof window !== 'undefined') {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.value.latitude},${pharmacy.value.longitude}`
    window.open(url, '_blank')
  }
}

// Load data on mount
onMounted(async () => {
  await fetchPharmacy()
  await fetchInventory()
})

// SEO
useHead({
  title: computed(() => pharmacy.value ? `${pharmacy.value.name} - PharmFinder` : 'Pharmacie - PharmFinder'),
  meta: [
    { name: 'description', content: computed(() => pharmacy.value ? `Découvrez l'inventaire de ${pharmacy.value.name} à ${pharmacy.value.city}` : 'Détails de la pharmacie') }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
