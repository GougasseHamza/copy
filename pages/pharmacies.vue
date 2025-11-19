<template>
  <NuxtLayout name="default">
    <div class="container-custom py-8">
      <div class="mb-8" ref="headerSection">
        <h1 class="text-4xl font-bold mb-2">Pharmacies à proximité</h1>
        <p class="text-muted-foreground">Trouvez les pharmacies ouvertes près de chez vous</p>
      </div>

      <!-- Search and Filters -->
      <div class="mb-6 space-y-4" ref="searchSection">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search Input -->
          <div class="flex-1 relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Rechercher une pharmacie..."
              class="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <!-- View Toggle -->
          <div class="flex gap-2 p-1 bg-muted rounded-lg">
            <button 
              @click="viewMode = 'list'"
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
                viewMode === 'list' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              ]"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
              <span class="hidden sm:inline">Liste</span>
            </button>
            <button 
              @click="viewMode = 'map'"
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
                viewMode === 'map' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              ]"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
              <span class="hidden sm:inline">Carte</span>
            </button>
          </div>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-2">
          <button 
            @click="filterOpen = !filterOpen"
            :class="[
              'px-4 py-2 rounded-lg border transition-colors',
              filterOpen ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            ]"
          >
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Ouvertes maintenant
            </div>
          </button>

          <button class="px-4 py-2 rounded-lg border hover:bg-accent transition-colors">
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
              Note 4+
            </div>
          </button>

          <button class="px-4 py-2 rounded-lg border hover:bg-accent transition-colors">
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              </svg>
              Distance
            </div>
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Pharmacy List/Map -->
        <div :class="viewMode === 'map' ? 'md:col-span-2' : 'md:col-span-3'">
          <!-- List View -->
          <div v-if="viewMode === 'list'" class="space-y-4">
            <div 
              v-for="(pharmacy, index) in filteredPharmacies" 
              :key="pharmacy.id"
              ref="pharmacyCards"
              class="group bg-card rounded-lg border p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
              @click="selectPharmacy(pharmacy)"
            >
              <div class="flex gap-4">
                <!-- Image -->
                <div class="flex-shrink-0">
                  <img 
                    :src="pharmacy.image" 
                    :alt="pharmacy.name"
                    class="w-24 h-24 rounded-lg object-cover"
                  />
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h3 class="text-lg font-semibold group-hover:text-primary transition-colors">
                        {{ pharmacy.name }}
                      </h3>
                      <p class="text-sm text-muted-foreground">{{ pharmacy.address }}</p>
                    </div>
                    <div 
                      :class="[
                        'px-3 py-1 rounded-full text-xs font-medium',
                        pharmacy.isOpen ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      ]"
                    >
                      {{ pharmacy.isOpen ? 'Ouverte' : 'Fermée' }}
                    </div>
                  </div>

                  <div class="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div class="flex items-center gap-1">
                      <svg class="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span class="font-medium">{{ pharmacy.rating }}</span>
                      <span>({{ pharmacy.reviewCount }})</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      </svg>
                      <span>{{ pharmacy.distance }} km</span>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <button class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                      Voir les produits
                    </button>
                    <button class="px-4 py-2 border rounded-md hover:bg-accent transition-colors">
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Map View -->
          <div v-else class="bg-card rounded-lg border overflow-hidden" style="height: 600px;">
            <div class="w-full h-full flex items-center justify-center bg-muted">
              <div class="text-center">
                <svg class="h-16 w-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
                <p class="text-muted-foreground">Carte Google Maps</p>
                <p class="text-sm text-muted-foreground mt-2">Intégration en cours de développement</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Selected Pharmacy Detail (when in map view) -->
        <div v-if="viewMode === 'map' && selectedPharmacy" class="bg-card rounded-lg border p-6">
          <h3 class="text-xl font-semibold mb-4">{{ selectedPharmacy.name }}</h3>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-muted-foreground mb-1">Adresse</p>
              <p class="font-medium">{{ selectedPharmacy.address }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-1">Téléphone</p>
              <p class="font-medium">{{ selectedPharmacy.phone }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-1">Statut</p>
              <div 
                :class="[
                  'inline-block px-3 py-1 rounded-full text-sm font-medium',
                  selectedPharmacy.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                ]"
              >
                {{ selectedPharmacy.isOpen ? 'Ouverte' : 'Fermée' }}
              </div>
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-1">Évaluation</p>
              <div class="flex items-center gap-2">
                <div class="flex">
                  <svg v-for="i in 5" :key="i" :class="[
                    'h-5 w-5',
                    i <= Math.floor(selectedPharmacy.rating) ? 'text-yellow-500' : 'text-gray-300'
                  ]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <span class="text-sm">{{ selectedPharmacy.rating }} ({{ selectedPharmacy.reviewCount }} avis)</span>
              </div>
            </div>
            <NuxtLink :to="`/pharmacy/${selectedPharmacy.id}`" class="block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Voir les détails
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { mockPharmacies, type Pharmacy } from '~/data/mockData'

gsap.registerPlugin(ScrollTrigger)

const searchQuery = ref('')
const viewMode = ref<'list' | 'map'>('list')
const filterOpen = ref(true)
const selectedPharmacy = ref<Pharmacy | null>(null)
const headerSection = ref<HTMLElement | null>(null)
const searchSection = ref<HTMLElement | null>(null)
const pharmacyCards = ref<HTMLElement[]>([])

const filteredPharmacies = computed(() => {
  let pharmacies = [...mockPharmacies]
  
  if (searchQuery.value) {
    pharmacies = pharmacies.filter(p => 
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (filterOpen.value) {
    pharmacies = pharmacies.filter(p => p.isOpen)
  }
  
  return pharmacies
})

const selectPharmacy = (pharmacy: Pharmacy) => {
  selectedPharmacy.value = pharmacy
  if (viewMode.value === 'list') {
    navigateTo(`/pharmacy/${pharmacy.id}`)
  }
}

onMounted(() => {
  // Animate header
  gsap.from(headerSection.value, {
    opacity: 0,
    y: -20,
    duration: 0.6,
    ease: 'power3.out'
  })

  // Animate search section
  gsap.from(searchSection.value, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 0.2,
    ease: 'power3.out'
  })

  // Animate pharmacy cards with stagger
  gsap.from(pharmacyCards.value, {
    opacity: 0,
    y: 30,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: pharmacyCards.value[0],
      start: 'top 80%'
    }
  })
})

useHead({
  title: 'Pharmacies - PharmFinder',
  meta: [
    { name: 'description', content: 'Trouvez les pharmacies ouvertes près de chez vous au Maroc' }
  ]
})
</script>
