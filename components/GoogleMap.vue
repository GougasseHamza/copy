<template>
  <div class="relative w-full h-full">
    <!-- Loading State -->
    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-beige-50 dark:bg-beige-900 z-10">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-nature-500 border-t-transparent mx-auto mb-4"></div>
        <p class="text-beige-600 dark:text-beige-400">Chargement de la carte...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900/20 z-10">
      <div class="text-center p-6">
        <svg class="mx-auto h-12 w-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-600 dark:text-red-400">{{ error }}</p>
      </div>
    </div>

    <!-- Map Container -->
    <div ref="mapContainer" class="w-full h-full"></div>

    <!-- Location Button -->
    <button
      v-if="!isLoading && !error"
      @click="centerOnUserLocation"
      class="absolute bottom-4 right-4 bg-white dark:bg-beige-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 border-2 border-beige-200 dark:border-beige-600 hover:border-nature-500"
      title="Ma position"
    >
      <svg class="h-6 w-6 text-nature-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Pharmacy {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  isOpen: boolean
  phone?: string
  rating?: number
}

interface Props {
  pharmacies: Pharmacy[]
  center?: { lat: number; lng: number }
  zoom?: number
  selectedPharmacy?: Pharmacy | null
}

const props = withDefaults(defineProps<Props>(), {
  zoom: 13,
  center: () => ({ lat: 33.5731, lng: -7.5898 }) // Casablanca default
})

const emit = defineEmits<{
  'select-pharmacy': [pharmacy: Pharmacy]
  'update:userLocation': [location: { lat: number; lng: number }]
}>()

const mapContainer = ref<HTMLDivElement>()
const map = ref<google.maps.Map>()
const markers = ref<google.maps.Marker[]>([])
const userMarker = ref<google.maps.Marker>()
const infoWindow = ref<google.maps.InfoWindow>()
const isLoading = ref(true)
const error = ref('')

const { loadGoogleMaps, calculateDistance, formatDistance } = useGoogleMaps()

onMounted(async () => {
  try {
    await loadGoogleMaps()
    await initMap()
    isLoading.value = false
  } catch (err: any) {
    error.value = err.message || 'Erreur lors du chargement de la carte'
    isLoading.value = false
  }
})

const initMap = async () => {
  if (!mapContainer.value) return

  // Create map
  map.value = new google.maps.Map(mapContainer.value, {
    center: props.center,
    zoom: props.zoom,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ],
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    zoomControl: true
  })

  // Create info window
  infoWindow.value = new google.maps.InfoWindow()

  // Add pharmacy markers
  updateMarkers()

  // Try to get user's location
  getUserLocation()
}

const updateMarkers = () => {
  // Clear existing markers
  markers.value.forEach(marker => marker.setMap(null))
  markers.value = []

  // Add new markers
  props.pharmacies.forEach(pharmacy => {
    // Validate coordinates - skip if invalid
    const lat = parseFloat(pharmacy.latitude)
    const lng = parseFloat(pharmacy.longitude)

    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      console.warn(`Invalid coordinates for pharmacy ${pharmacy.name}:`, { lat: pharmacy.latitude, lng: pharmacy.longitude })
      return
    }

    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: map.value,
      title: pharmacy.name,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: pharmacy.isOpen ? '#22c55e' : '#ef4444',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3
      }
    })

    marker.addListener('click', () => {
      showPharmacyInfo(pharmacy, marker)
      emit('select-pharmacy', pharmacy)
    })

    markers.value.push(marker)
  })

  // Fit bounds to show all markers
  if (markers.value.length > 0) {
    const bounds = new google.maps.LatLngBounds()
    markers.value.forEach(marker => {
      const position = marker.getPosition()
      if (position) bounds.extend(position)
    })
    map.value?.fitBounds(bounds)
  }
}

const showPharmacyInfo = (pharmacy: Pharmacy, marker: google.maps.Marker) => {
  const statusColor = pharmacy.isOpen ? 'text-green-600' : 'text-red-600'
  const statusText = pharmacy.isOpen ? '🟢 Ouverte' : '🔴 Fermée'

  const content = `
    <div class="p-4 max-w-xs">
      <h3 class="text-lg font-bold text-gray-900 mb-2">${pharmacy.name}</h3>
      <div class="space-y-2 text-sm">
        <p class="flex items-start gap-2">
          <svg class="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          </svg>
          <span class="text-gray-700">${pharmacy.address}</span>
        </p>
        ${pharmacy.phone ? `
          <p class="flex items-center gap-2">
            <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <a href="tel:${pharmacy.phone}" class="text-nature-600 hover:underline">${pharmacy.phone}</a>
          </p>
        ` : ''}
        <p class="flex items-center gap-2">
          <span class="font-semibold ${statusColor}">${statusText}</span>
        </p>
        ${pharmacy.rating ? `
          <div class="flex items-center gap-1">
            <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
            <span class="text-gray-700 font-medium">${pharmacy.rating.toFixed(1)}/5</span>
          </div>
        ` : ''}
      </div>
      <a
        href="https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}"
        target="_blank"
        class="mt-4 block w-full text-center bg-nature-600 text-white px-4 py-2 rounded-lg hover:bg-nature-700 transition-colors font-medium"
      >
        Itinéraire
      </a>
    </div>
  `

  infoWindow.value?.setContent(content)
  infoWindow.value?.open(map.value, marker)
}

const getUserLocation = () => {
  if (!navigator.geolocation) return

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      // Add user marker
      if (userMarker.value) {
        userMarker.value.setPosition(userLocation)
      } else {
        userMarker.value = new google.maps.Marker({
          position: userLocation,
          map: map.value,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#3b82f6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3
          },
          title: 'Votre position'
        })
      }

      emit('update:userLocation', userLocation)

      // Center map on user
      map.value?.setCenter(userLocation)
      map.value?.setZoom(14)
    },
    (error) => {
      console.error('Error getting location:', error)
    }
  )
}

const centerOnUserLocation = () => {
  getUserLocation()
}

// Watch for pharmacy changes
watch(() => props.pharmacies, () => {
  if (map.value) {
    updateMarkers()
  }
}, { deep: true })

// Watch for selected pharmacy
watch(() => props.selectedPharmacy, (newPharmacy) => {
  if (newPharmacy && map.value) {
    const marker = markers.value.find((m, index) =>
      props.pharmacies[index]?.id === newPharmacy.id
    )
    if (marker) {
      map.value.setCenter({ lat: newPharmacy.latitude, lng: newPharmacy.longitude })
      map.value.setZoom(16)
      showPharmacyInfo(newPharmacy, marker)
    }
  }
})
</script>
