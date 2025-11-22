interface GoogleMapsOptions {
  apiKey: string
}

export const useGoogleMaps = () => {
  const config = useRuntimeConfig()
  const isLoaded = ref(false)
  const isLoading = ref(false)

  const loadGoogleMaps = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // If already loaded, resolve immediately
      if (window.google && window.google.maps) {
        isLoaded.value = true
        resolve()
        return
      }

      // If already loading, wait for it
      if (isLoading.value) {
        const checkInterval = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkInterval)
            isLoaded.value = true
            resolve()
          }
        }, 100)
        return
      }

      isLoading.value = true

      // Create script element
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsApiKey}&libraries=places,geometry`
      script.async = true
      script.defer = true

      script.onload = () => {
        isLoaded.value = true
        isLoading.value = false
        resolve()
      }

      script.onerror = (error) => {
        isLoading.value = false
        reject(new Error('Failed to load Google Maps script'))
      }

      document.head.appendChild(script)
    })
  }

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number => {
    if (!window.google || !window.google.maps) return 0

    const from = new google.maps.LatLng(lat1, lng1)
    const to = new google.maps.LatLng(lat2, lng2)

    // Returns distance in meters
    return google.maps.geometry.spherical.computeDistanceBetween(from, to)
  }

  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`
    }
    return `${(meters / 1000).toFixed(1)} km`
  }

  return {
    isLoaded,
    isLoading,
    loadGoogleMaps,
    calculateDistance,
    formatDistance
  }
}
