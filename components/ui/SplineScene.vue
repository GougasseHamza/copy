<template>
  <div :class="className" class="w-full h-full relative">
    <canvas ref="splineCanvas" class="w-full h-full"></canvas>
    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center z-10 bg-nature-900/20">
      <div class="text-center">
        <span class="loader"></span>
        <p class="text-nature-100 mt-4 text-sm">{{ loadingMessage }}</p>
      </div>
    </div>
    <div v-if="error" class="absolute inset-0 flex items-center justify-center z-10 bg-nature-900/80">
      <div class="text-center text-nature-100 p-6">
        <p class="text-lg font-semibold mb-2">Failed to load 3D scene</p>
        <p class="text-sm opacity-75">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  scene: string
  className?: string
}

const props = defineProps<Props>()

const splineCanvas = ref<HTMLCanvasElement | null>(null)
const isLoading = ref(true)
const loadingMessage = ref('Initializing 3D scene...')
const error = ref('')
let splineApp: any = null

onMounted(async () => {
  console.log('SplineScene: Component mounted')
  console.log('SplineScene: Scene URL:', props.scene)

  // Only load Spline on client side
  if (typeof window === 'undefined') {
    console.error('SplineScene: Window is undefined')
    error.value = 'Cannot load on server side'
    isLoading.value = false
    return
  }

  if (!splineCanvas.value) {
    console.error('SplineScene: Canvas ref is null')
    error.value = 'Canvas not found'
    isLoading.value = false
    return
  }

  try {
    loadingMessage.value = 'Loading Spline runtime...'
    console.log('SplineScene: Importing Spline runtime')

    // Dynamically import Spline runtime only on client
    const { Application } = await import('@splinetool/runtime')
    console.log('SplineScene: Spline runtime loaded successfully')

    loadingMessage.value = 'Creating Spline application...'
    console.log('SplineScene: Canvas element:', splineCanvas.value)
    splineApp = new Application(splineCanvas.value)
    console.log('SplineScene: Application created')

    loadingMessage.value = 'Loading 3D scene...'
    console.log('SplineScene: Loading scene from:', props.scene)
    await splineApp.load(props.scene)

    console.log('SplineScene: Scene loaded successfully!')
    isLoading.value = false
  } catch (err) {
    console.error('SplineScene: Error loading scene:', err)
    error.value = err instanceof Error ? err.message : 'Unknown error'
    isLoading.value = false
  }
})

onUnmounted(() => {
  console.log('SplineScene: Component unmounting')
  // Cleanup if needed
  if (splineApp && typeof splineApp.dispose === 'function') {
    splineApp.dispose()
  }
  splineApp = null
})
</script>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid rgba(134, 239, 172, 0.3);
  border-bottom-color: #86efac;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
