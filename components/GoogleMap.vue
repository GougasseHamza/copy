<template>
  <div ref="mapContainer" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import type { Pharmacy } from '~/data/mockData'

interface Props {
  pharmacies: Pharmacy[]
  center?: { lat: number; lng: number }
  zoom?: number
}

const props = withDefaults(defineProps<Props>(), {
  zoom: 12
})

const emit = defineEmits<{
  selectPharmacy: [pharmacy: Pharmacy]
}>()

const config = useRuntimeConfig()
const mapContainer = ref<HTMLElement | null>(null)
const map = ref<google.maps.Map | null>(null)
const markers = ref<google.maps.Marker[]>([])
const infoWindows = ref<google.maps.InfoWindow[]>([])

onMounted(async () => {
  if (!config.public.googleMapsApiKey) {
    console.error('Google Maps API key not configured')
    return
  }

  try {
    const loader = new Loader({
      apiKey: config.public.googleMapsApiKey,
      version: 'weekly',
      libraries: ['places']
    })

    await loader.load()

    if (!mapContainer.value) return

    // Determine map center
    let mapCenter = props.center
    if (!mapCenter && props.pharmacies.length > 0) {
      // Use first pharmacy as center
      mapCenter = {
        lat: props.pharmacies[0].latitude,
        lng: props.pharmacies[0].longitude
      }
    } else if (!mapCenter) {
      // Default to Casablanca, Morocco
      mapCenter = { lat: 33.5731, lng: -7.5898 }
    }

    // Create map
    map.value = new google.maps.Map(mapContainer.value, {
      center: mapCenter,
      zoom: props.zoom,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    })

    // Add markers
    createMarkers()
  } catch (error) {
    console.error('Error loading Google Maps:', error)
  }
})

const createMarkers = () => {
  // Clear existing markers
  markers.value.forEach(marker => marker.setMap(null))
  infoWindows.value.forEach(infoWindow => infoWindow.close())
  markers.value = []
  infoWindows.value = []

  if (!map.value) return

  props.pharmacies.forEach(pharmacy => {
    if (!map.value) return

    const marker = new google.maps.Marker({
      position: {
        lat: pharmacy.latitude,
        lng: pharmacy.longitude
      },
      map: map.value,
      title: pharmacy.name,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: pharmacy.isOpen ? '#16a34a' : '#dc2626',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2
      }
    })

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 12px; max-width: 250px;">
          <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #1f2937;">
            ${pharmacy.name}
          </h3>
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">
            📍 ${pharmacy.address}
          </p>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-weight: 600; color: #1f2937;">⭐ ${pharmacy.rating}</span>
            <span style="color: #9ca3af; font-size: 12px;">(${pharmacy.reviewCount} avis)</span>
          </div>
          <div style="margin-bottom: 12px;">
            <span style="display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; ${
              pharmacy.isOpen
                ? 'background-color: #dcfce7; color: #16a34a;'
                : 'background-color: #fee2e2; color: #dc2626;'
            }">
              ${pharmacy.isOpen ? '🟢 Ouverte' : '🔴 Fermée'}
            </span>
          </div>
          <button
            onclick="window.dispatchEvent(new CustomEvent('pharmacy-select', { detail: '${pharmacy.id}' }))"
            style="
              width: 100%;
              padding: 8px 16px;
              background: linear-gradient(to right, #16a34a, #15803d);
              color: white;
              border: none;
              border-radius: 8px;
              font-weight: 600;
              cursor: pointer;
              font-size: 14px;
            "
          >
            💊 Voir les détails
          </button>
        </div>
      `
    })

    marker.addListener('click', () => {
      // Close all other info windows
      infoWindows.value.forEach(iw => iw.close())
      // Open this info window
      infoWindow.open(map.value!, marker)
      // Emit select event
      emit('selectPharmacy', pharmacy)
    })

    markers.value.push(marker)
    infoWindows.value.push(infoWindow)
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

// Listen for pharmacy selection from info window
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('pharmacy-select', ((event: CustomEvent) => {
      const pharmacyId = event.detail
      const pharmacy = props.pharmacies.find(p => p.id === pharmacyId)
      if (pharmacy) {
        emit('selectPharmacy', pharmacy)
      }
    }) as EventListener)
  }
})

watch(() => props.pharmacies, () => {
  if (map.value) {
    createMarkers()
  }
}, { deep: true })

onUnmounted(() => {
  markers.value.forEach(marker => marker.setMap(null))
  infoWindows.value.forEach(infoWindow => infoWindow.close())
})
</script>
