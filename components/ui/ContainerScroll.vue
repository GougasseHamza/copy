<template>
  <div
    ref="containerRef"
    class="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
  >
    <div
      class="py-10 md:py-40 w-full relative"
      style="perspective: 1000px"
    >
      <!-- Header with title -->
      <div
        v-motion
        :initial="{ y: 0 }"
        :style="{ transform: `translateY(${translate}px)` }"
        class="div max-w-5xl mx-auto text-center"
      >
        <slot name="title" />
      </div>

      <!-- Card with content -->
      <div
        v-motion
        :style="{
          transform: `rotateX(${rotate}deg) scale(${scale})`,
          boxShadow:
            '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
        }"
        class="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-nature-700 p-2 md:p-6 bg-nature-900 rounded-[30px] shadow-2xl"
      >
        <div class="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScroll, useElementBounding } from '@vueuse/core'

const containerRef = ref<HTMLElement | null>(null)
const rotate = ref(20)
const scale = ref(1.05)
const translate = ref(0)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  if (containerRef.value) {
    // Track window scroll instead of container scroll
    const { y: scrollY } = useScroll(window)
    const { top, height } = useElementBounding(containerRef)

    // Watch for scroll changes
    const updateValues = () => {
      // Calculate progress based on element position in viewport
      // Start animating when element enters viewport, finish when it's about to leave
      const windowHeight = window.innerHeight
      const scrollProgress = scrollY.value
      const elementTop = top.value

      // Calculate scroll progress within the container's scroll range
      // Animation starts when container enters viewport and ends when it's scrolled past
      const startScroll = elementTop + scrollProgress - windowHeight
      const endScroll = elementTop + scrollProgress + height.value / 2
      const scrollRange = endScroll - startScroll

      const progress = Math.min(Math.max((scrollProgress - startScroll) / scrollRange, 0), 1)

      // Update rotate: 20 -> 0
      rotate.value = 20 * (1 - progress)

      // Update scale: 1.05 -> 1 (or 0.7 -> 0.9 on mobile)
      if (isMobile.value) {
        scale.value = 0.7 + (progress * 0.2)
      } else {
        scale.value = 1.05 - (progress * 0.05)
      }

      // Update translate: 0 -> -100
      translate.value = -(progress * 100)
    }

    // Use requestAnimationFrame for smooth updates
    let rafId: number
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateValues)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // Initial update
    updateValues()

    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>
