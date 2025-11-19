<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useMotionProperties, useSpring } from '@vueuse/motion'
import { useWindowSize } from '@vueuse/core'

interface Props {
  titleComponent?: string
}

const props = defineProps<Props>()

const containerRef = ref<HTMLDivElement | null>(null)
const { width: windowWidth } = useWindowSize()
const scrollProgress = ref(0)

const isMobile = computed(() => windowWidth.value <= 768)

const scaleDimensions = computed(() => {
  return isMobile.value ? [0.7, 0.9] : [1.05, 1]
})

// Calculate scroll progress
const updateScrollProgress = () => {
  if (!containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  const elementTop = rect.top
  const elementHeight = rect.height
  const windowHeight = window.innerHeight

  // Calculate progress based on scroll position
  const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)))
  scrollProgress.value = progress
}

// Computed values based on scroll progress
const rotate = computed(() => 20 - scrollProgress.value * 20)
const scale = computed(() => {
  const [start, end] = scaleDimensions.value
  return start + (end - start) * scrollProgress.value
})
const translate = computed(() => -scrollProgress.value * 100)

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
  updateScrollProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<template>
  <div
    ref="containerRef"
    class="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
  >
    <div
      class="py-10 md:py-40 w-full relative"
      style="perspective: 1000px"
    >
      <!-- Header -->
      <div
        class="max-w-5xl mx-auto text-center"
        :style="{
          transform: `translateY(${translate}px)`,
          transition: 'transform 0.1s ease-out'
        }"
      >
        <slot name="title">
          <div v-if="titleComponent" v-html="titleComponent" />
        </slot>
      </div>

      <!-- Card -->
      <div
        class="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
        :style="{
          transform: `rotateX(${rotate}deg) scale(${scale})`,
          boxShadow: '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
          transition: 'transform 0.1s ease-out'
        }"
      >
        <div class="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
