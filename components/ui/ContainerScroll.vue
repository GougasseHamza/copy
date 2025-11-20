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
        :style="{ transform: `translateY(${translate}px)` }"
        class="div max-w-5xl mx-auto text-center transition-transform duration-300"
      >
        <slot name="title" />
      </div>

      <!-- Card with content -->
      <div
        :style="{
          transform: `rotateX(${rotate}deg) scale(${scale})`,
          boxShadow:
            '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
        }"
        class="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-nature-700 p-2 md:p-6 bg-nature-900 rounded-[30px] shadow-2xl transition-transform duration-300"
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

const containerRef = ref<HTMLElement | null>(null)
const rotate = ref(20)
const scale = ref(1.05)
const translate = ref(0)
const isMobile = ref(false)

const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth <= 768
  }
}

const handleScroll = () => {
  if (!containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))

  // Update rotate: 20 -> 0
  rotate.value = 20 - (scrollProgress * 20)

  // Update scale: 1.05 -> 1 (or 0.7 -> 0.9 on mobile)
  if (isMobile.value) {
    scale.value = 0.7 + (scrollProgress * 0.2)
  } else {
    scale.value = 1.05 - (scrollProgress * 0.05)
  }

  // Update translate: 0 -> -100
  translate.value = -(scrollProgress * 100)
}

onMounted(() => {
  checkMobile()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', checkMobile)
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', checkMobile)
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>
