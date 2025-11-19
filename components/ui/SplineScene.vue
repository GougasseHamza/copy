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
import { Application } from '@splinetool/runtime'

interface Props {
  scene: string
  className?: string
}

const props = defineProps<Props>()

const splineContainer = ref<HTMLDivElement | null>(null)
let splineApp: Application | null = null

onMounted(async () => {
  if (splineContainer.value) {
    splineApp = new Application(splineContainer.value)
    try {
      await splineApp.load(props.scene)
    } catch (error) {
      console.error('Error loading Spline scene:', error)
    }
  }
})

onUnmounted(() => {
  // Cleanup if needed
  splineApp = null
})
</script>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-bottom-color: transparent;
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
