<template>
  <NuxtLayout name="default">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-nature-800 via-beige-800 to-earth-800 py-20 mb-12">
      <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <Spotlight
        class="absolute -top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(134, 197, 134, 0.15)"
      />
      <div class="container-custom relative z-10" ref="headerSection">
        <h1 class="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-beige-50 via-beige-100 to-earth-100 bg-clip-text text-transparent">
          Pharmacies à Proximité
        </h1>
        <p class="text-xl text-beige-100/90 max-w-2xl">
          Trouvez les pharmacies ouvertes près de chez vous et vérifiez la disponibilité de vos médicaments
        </p>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-6 mt-8 max-w-2xl">
          <div class="text-center">
            <div class="text-3xl font-bold text-nature-300">{{ filteredPharmacies.length }}</div>
            <div class="text-sm text-beige-200">Pharmacies</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-nature-400">{{ openCount }}</div>
            <div class="text-sm text-nature-200">Ouvertes</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-nature-300">24/7</div>
            <div class="text-sm text-beige-200">Disponible</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-custom pb-16 -mt-6">
      <!-- Search and Filters Card -->
      <div class="bg-white dark:bg-beige-900/50 backdrop-blur-lg rounded-2xl border border-beige-200 dark:border-beige-700 shadow-xl p-6 mb-8" ref="searchSection">
        <div class="flex flex-col md:flex-row gap-4 mb-4">
          <!-- Search Input -->
          <div class="flex-1 relative group">
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-beige-400 group-focus-within:text-earth-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher par nom ou adresse..."
              class="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-beige-200 dark:border-beige-700 bg-white dark:bg-beige-800/50 text-beige-900 dark:text-beige-50 placeholder-beige-400 focus:outline-none focus:border-earth-500 focus:ring-4 focus:ring-earth-500/10 transition-all"
            />
          </div>

          <!-- View Toggle -->
          <div class="flex gap-2 p-1.5 bg-beige-100 dark:bg-beige-800 rounded-xl">
            <button
              @click="viewMode = 'list'"
              :class="[
                'flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-300',
                viewMode === 'list'
                  ? 'bg-white dark:bg-beige-700 shadow-md scale-105'
                  : 'hover:bg-white/50 dark:hover:bg-beige-700/50'
              ]"
            >
              <svg class="h-5 w-5" :class="viewMode === 'list' ? 'text-earth-600' : 'text-beige-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
              <span class="hidden sm:inline font-medium" :class="viewMode === 'list' ? 'text-earth-700 dark:text-earth-300' : 'text-beige-600'">Liste</span>
            </button>
            <button
              @click="viewMode = 'map'"
              :class="[
                'flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-300',
                viewMode === 'map'
                  ? 'bg-white dark:bg-beige-700 shadow-md scale-105'
                  : 'hover:bg-white/50 dark:hover:bg-beige-700/50'
              ]"
            >
              <svg class="h-5 w-5" :class="viewMode === 'map' ? 'text-earth-600' : 'text-beige-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
              <span class="hidden sm:inline font-medium" :class="viewMode === 'map' ? 'text-earth-700 dark:text-earth-300' : 'text-beige-600'">Carte</span>
            </button>
          </div>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-3">
          <button
            @click="filterOpen = !filterOpen"
            :class="[
              'px-5 py-2.5 rounded-xl border-2 transition-all duration-300 font-medium',
              filterOpen
                ? 'bg-nature-500 text-white border-nature-500 shadow-lg shadow-nature-500/30'
                : 'border-beige-300 dark:border-beige-600 hover:border-nature-400 hover:bg-nature-50 dark:hover:bg-nature-900/30'
            ]"
          >
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Ouvertes maintenant
            </div>
          </button>

          <button
            @click="minRating = minRating === 4 ? 0 : 4"
            :class="[
              'px-5 py-2.5 rounded-xl border-2 transition-all duration-300 font-medium',
              minRating === 4
                ? 'bg-nature-600 text-white border-nature-600 shadow-lg shadow-nature-600/30'
                : 'border-beige-300 dark:border-beige-600 hover:border-nature-400 hover:bg-nature-50 dark:hover:bg-nature-900/30'
            ]"
          >
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
              Note 4+
            </div>
          </button>

          <button
            @click="sortByDistance = !sortByDistance"
            :class="[
              'px-5 py-2.5 rounded-xl border-2 transition-all duration-300 font-medium',
              sortByDistance
                ? 'bg-nature-600 text-white border-nature-600 shadow-lg shadow-nature-600/30'
                : 'border-beige-300 dark:border-beige-600 hover:border-nature-400 hover:bg-nature-50 dark:hover:bg-nature-900/30'
            ]"
          >
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              </svg>
              Plus proches
            </div>
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Pharmacy List/Map -->
        <div :class="viewMode === 'map' ? 'md:col-span-2' : 'md:col-span-3'">
          <!-- Loading State -->
          <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-nature-500 border-t-transparent"></div>
            <p class="mt-4 text-beige-600 dark:text-beige-400">Chargement des pharmacies...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
            <svg class="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="mt-4 text-lg font-semibold text-red-800 dark:text-red-200">Erreur de chargement</h3>
            <p class="mt-2 text-red-600 dark:text-red-400">{{ error }}</p>
            <button
              @click="() => window.location.reload()"
              class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Réessayer
            </button>
          </div>

          <!-- List View -->
          <div v-else-if="viewMode === 'list'" class="space-y-5">
            <div
              v-for="(pharmacy, index) in filteredPharmacies"
              :key="pharmacy.id"
              class="group relative bg-white dark:bg-beige-900/30 backdrop-blur-sm rounded-2xl border-2 border-beige-200 dark:border-beige-700 overflow-hidden hover:border-earth-400 dark:hover:border-earth-500 hover:shadow-2xl hover:shadow-earth-500/10 transition-all duration-500 cursor-pointer"
              @click="selectPharmacy(pharmacy)"
            >
              <!-- Gradient overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-br from-earth-500/0 via-earth-400/0 to-beige-500/0 group-hover:from-earth-500/5 group-hover:via-earth-400/5 group-hover:to-beige-500/5 transition-all duration-500 pointer-events-none"></div>

              <div class="relative p-6">
                <div class="flex gap-6">
                  <!-- Image with badge -->
                  <div class="relative flex-shrink-0">
                    <div class="w-32 h-32 rounded-xl overflow-hidden ring-4 ring-beige-100 dark:ring-beige-800 group-hover:ring-earth-300 dark:group-hover:ring-earth-600 transition-all duration-500">
                      <img
                        :src="pharmacy.image"
                        :alt="pharmacy.name"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <!-- Status badge -->
                    <div
                      :class="[
                        'absolute -top-2 -right-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm',
                        pharmacy.isOpen
                          ? 'bg-green-500/90 text-white ring-2 ring-green-400'
                          : 'bg-red-500/90 text-white ring-2 ring-red-400'
                      ]"
                    >
                      {{ pharmacy.isOpen ? '🟢 Ouverte' : '🔴 Fermée' }}
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <div class="mb-3">
                      <h3 class="text-2xl font-bold text-beige-900 dark:text-beige-50 group-hover:text-nature-600 dark:group-hover:text-nature-400 transition-colors mb-1">
                        {{ pharmacy.name }}
                      </h3>
                      <div class="flex items-start gap-2 text-beige-600 dark:text-beige-300">
                        <svg class="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <p class="text-sm">{{ pharmacy.address }}, {{ pharmacy.city }}</p>
                      </div>
                    </div>

                    <!-- Stats -->
                    <div class="flex items-center gap-6 mb-4">
                      <div class="flex items-center gap-1.5">
                        <svg class="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span class="font-bold text-beige-900 dark:text-beige-50">{{ pharmacy.rating }}</span>
                        <span class="text-sm text-beige-500 dark:text-beige-400">({{ pharmacy.reviewCount }} avis)</span>
                      </div>
                      <div class="flex items-center gap-1.5 text-earth-600 dark:text-earth-400 font-medium">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                        <span class="text-sm">{{ pharmacy.distance }} km</span>
                      </div>
                    </div>

                    <!-- Action buttons -->
                    <div class="flex items-center gap-2">
                      <button
                        @click.stop="navigateTo(`/pharmacy/${pharmacy.id}`)"
                        class="flex-1 px-5 py-3 bg-gradient-to-r from-nature-600 to-nature-700 text-white rounded-xl font-semibold hover:from-nature-700 hover:to-nature-800 hover:shadow-lg hover:shadow-nature-600/30 transform hover:scale-105 transition-all duration-300"
                      >
                        💊 Voir les produits
                      </button>
                      <button
                        @click.stop="window.open(`tel:${pharmacy.phone}`)"
                        class="px-4 py-3 bg-beige-100 dark:bg-beige-800 text-earth-600 dark:text-earth-400 rounded-xl hover:bg-earth-100 dark:hover:bg-earth-900 hover:scale-110 transition-all duration-300 group/btn"
                        title="Appeler"
                      >
                        <svg class="h-5 w-5 group-hover/btn:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </button>
                      <button
                        @click.stop="getDirections(pharmacy)"
                        class="px-4 py-3 bg-beige-100 dark:bg-beige-800 text-earth-600 dark:text-earth-400 rounded-xl hover:bg-earth-100 dark:hover:bg-earth-900 hover:scale-110 transition-all duration-300 group/btn"
                        title="Itinéraire"
                      >
                        <svg class="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                        </svg>
                      </button>
                      <button
                        @click.stop="toggleFavorite(pharmacy.id)"
                        :class="[
                          'px-4 py-3 rounded-xl hover:scale-110 transition-all duration-300',
                          favorites.includes(pharmacy.id)
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600'
                            : 'bg-beige-100 dark:bg-beige-800 text-beige-400 dark:text-beige-500'
                        ]"
                        title="Favoris"
                      >
                        <svg class="h-5 w-5" :fill="favorites.includes(pharmacy.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Map View -->
          <div v-else class="bg-gradient-to-br from-beige-50 to-earth-50 dark:from-beige-900 dark:to-earth-900 rounded-2xl border-2 border-beige-200 dark:border-beige-700 overflow-hidden shadow-xl" style="height: 600px;">
            <div class="w-full h-full flex items-center justify-center relative">
              <!-- Animated background -->
              <div class="absolute inset-0 opacity-10">
                <div class="absolute top-10 left-10 w-32 h-32 bg-earth-400 rounded-full blur-3xl animate-pulse"></div>
                <div class="absolute bottom-10 right-10 w-40 h-40 bg-beige-400 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
              </div>

              <div class="text-center relative z-10">
                <div class="mb-6 relative">
                  <div class="absolute inset-0 bg-earth-500/20 blur-2xl rounded-full"></div>
                  <svg class="h-24 w-24 mx-auto text-earth-500 dark:text-earth-400 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-beige-900 dark:text-beige-50 mb-2">🗺️ Carte Interactive</h3>
                <p class="text-beige-600 dark:text-beige-300 mb-1">Intégration Google Maps</p>
                <p class="text-sm text-beige-500 dark:text-beige-400">En cours de développement...</p>
                <div class="mt-6 flex items-center justify-center gap-2">
                  <div class="w-2 h-2 bg-earth-500 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-earth-500 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
                  <div class="w-2 h-2 bg-earth-500 rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Selected Pharmacy Detail (when in map view) -->
        <div v-if="viewMode === 'map' && selectedPharmacy" class="bg-white dark:bg-beige-900/50 backdrop-blur-lg rounded-2xl border-2 border-beige-200 dark:border-beige-700 shadow-xl p-6">
          <div class="mb-4">
            <img
              :src="selectedPharmacy.image"
              :alt="selectedPharmacy.name"
              class="w-full h-40 object-cover rounded-xl mb-4"
            />
            <h3 class="text-2xl font-bold text-beige-900 dark:text-beige-50 mb-2">{{ selectedPharmacy.name }}</h3>
          </div>

          <div class="space-y-4">
            <div class="bg-beige-50 dark:bg-beige-800/50 rounded-xl p-4">
              <p class="text-xs text-beige-600 dark:text-beige-400 mb-1 font-medium uppercase">Adresse</p>
              <p class="text-beige-900 dark:text-beige-50 font-medium">{{ selectedPharmacy.address }}</p>
              <p class="text-sm text-beige-600 dark:text-beige-300">{{ selectedPharmacy.city }}</p>
            </div>

            <div class="bg-beige-50 dark:bg-beige-800/50 rounded-xl p-4">
              <p class="text-xs text-beige-600 dark:text-beige-400 mb-1 font-medium uppercase">Téléphone</p>
              <a :href="`tel:${selectedPharmacy.phone}`" class="text-earth-600 dark:text-earth-400 font-semibold hover:underline">
                {{ selectedPharmacy.phone }}
              </a>
            </div>

            <div class="bg-beige-50 dark:bg-beige-800/50 rounded-xl p-4">
              <p class="text-xs text-beige-600 dark:text-beige-400 mb-2 font-medium uppercase">Statut</p>
              <div
                :class="[
                  'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-lg',
                  selectedPharmacy.isOpen
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                ]"
              >
                <span>{{ selectedPharmacy.isOpen ? '🟢' : '🔴' }}</span>
                {{ selectedPharmacy.isOpen ? 'Ouverte' : 'Fermée' }}
              </div>
            </div>

            <div class="bg-beige-50 dark:bg-beige-800/50 rounded-xl p-4">
              <p class="text-xs text-beige-600 dark:text-beige-400 mb-2 font-medium uppercase">Évaluation</p>
              <div class="flex items-center gap-2">
                <div class="flex">
                  <svg v-for="i in 5" :key="i" :class="[
                    'h-6 w-6',
                    i <= Math.floor(selectedPharmacy.rating) ? 'text-yellow-500' : 'text-beige-300 dark:text-beige-600'
                  ]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
              <p class="text-sm text-beige-600 dark:text-beige-300 mt-1">{{ selectedPharmacy.rating }} sur 5 ({{ selectedPharmacy.reviewCount }} avis)</p>
            </div>

            <NuxtLink
              :to="`/pharmacy/${selectedPharmacy.id}`"
              class="block w-full text-center px-6 py-4 bg-gradient-to-r from-nature-600 to-nature-700 text-white rounded-xl font-bold hover:from-nature-700 hover:to-nature-800 hover:shadow-lg hover:shadow-nature-600/30 transform hover:scale-105 transition-all duration-300"
            >
              💊 Voir les détails
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
import { type Pharmacy } from '~/data/mockData'
import Spotlight from '@/components/ui/Spotlight.vue'

gsap.registerPlugin(ScrollTrigger)

const api = useApi()

const searchQuery = ref('')
const viewMode = ref<'list' | 'map'>('list')
const filterOpen = ref(true)
const minRating = ref(0)
const sortByDistance = ref(false)
const favorites = ref<string[]>([])
const selectedPharmacy = ref<Pharmacy | null>(null)
const headerSection = ref<HTMLElement | null>(null)
const searchSection = ref<HTMLElement | null>(null)

// Fetch pharmacies from backend
const pharmacies = ref<Pharmacy[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Fetch pharmacies on mount
onMounted(async () => {
  try {
    isLoading.value = true

    // Try to get user location for nearby pharmacies
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Get nearby pharmacies
          const response = await api.getNearbyPharmacies(
            position.coords.latitude,
            position.coords.longitude,
            5000 // 5km radius
          )
          pharmacies.value = response.data || []
        },
        async () => {
          // Fallback to all pharmacies if location denied
          const response = await api.fetchPharmacies()
          pharmacies.value = response.data || []
        }
      )
    } else {
      // No geolocation support, get all pharmacies
      const response = await api.fetchPharmacies()
      pharmacies.value = response.data || []
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to load pharmacies'
    console.error('Error loading pharmacies:', err)
  } finally {
    isLoading.value = false
  }

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
})

const filteredPharmacies = computed(() => {
  let filtered = [...pharmacies.value]

  if (searchQuery.value) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (filterOpen.value) {
    filtered = filtered.filter(p => p.isOpen)
  }

  if (minRating.value > 0) {
    filtered = filtered.filter(p => p.rating >= minRating.value)
  }

  if (sortByDistance.value) {
    filtered = filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0))
  }

  return filtered
})

const openCount = computed(() => {
  return pharmacies.value.filter(p => p.isOpen).length
})

const selectPharmacy = (pharmacy: Pharmacy) => {
  selectedPharmacy.value = pharmacy
  if (viewMode.value === 'list') {
    navigateTo(`/pharmacy/${pharmacy.id}`)
  }
}

const toggleFavorite = (pharmacyId: string) => {
  const index = favorites.value.indexOf(pharmacyId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(pharmacyId)
  }
}

const getDirections = (pharmacy: Pharmacy) => {
  if (typeof window !== 'undefined') {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`
    window.open(url, '_blank')
  }
}

useHead({
  title: 'Pharmacies - PharmFinder',
  meta: [
    { name: 'description', content: 'Trouvez les pharmacies ouvertes près de chez vous au Maroc' }
  ]
})
</script>
