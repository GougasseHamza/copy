<template>
  <Suspense>
    <template #default>
      <div ref="splineContainer" :class="className" class="w-full h-full"></div>
    </template>
    <template #fallback>
      <div class="w-full h-full flex items-center justify-center">
        <span class="loader"></span>
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  scene: string
  className?: string
}

const props = defineProps<Props>()

const splineContainer = ref<HTMLDivElement | null>(null)
let splineApp: any = null

onMounted(async () => {
  // Only load Spline on client side
  if (typeof window === 'undefined' || !splineContainer.value) return

  try {
    // Dynamically import Spline runtime only on client
    const { Application } = await import('@splinetool/runtime')
    splineApp = new Application(splineContainer.value)
    await splineApp.load(props.scene)
  } catch (error) {
    console.error('Error loading Spline scene:', error)
  }
})

onUnmounted(() => {
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
