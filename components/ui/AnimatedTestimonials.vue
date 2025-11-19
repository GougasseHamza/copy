<template>
  <div :class="cn('max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20', className)">
    <div class="relative grid grid-cols-1 md:grid-cols-2 gap-20">
      <!-- Images -->
      <div>
        <div class="relative h-80 w-full">
          <TransitionGroup name="testimonial">
            <div
              v-for="(testimonial, index) in testimonials"
              v-show="index === active"
              :key="testimonial.src"
              v-motion
              :initial="{
                opacity: 0,
                scale: 0.9,
                rotateY: randomRotateY(),
              }"
              :enter="{
                opacity: index === active ? 1 : 0.7,
                scale: index === active ? 1 : 0.95,
                rotateY: index === active ? 0 : randomRotateY(),
                transition: {
                  duration: 400,
                },
              }"
              class="absolute inset-0 origin-bottom"
              :style="{ zIndex: index === active ? 999 : testimonials.length + 2 - index }"
            >
              <img
                :src="testimonial.src"
                :alt="testimonial.name"
                draggable="false"
                class="h-full w-full rounded-3xl object-cover object-center"
              />
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- Content -->
      <div class="flex justify-between flex-col py-4">
        <div>
          <TransitionGroup name="fade">
            <div v-if="testimonials[active]" :key="active">
              <h3 class="text-2xl font-bold text-foreground">
                {{ testimonials[active].name }}
              </h3>
              <p class="text-sm text-muted-foreground">
                {{ testimonials[active].designation }}
              </p>
              <p class="text-lg text-muted-foreground mt-8">
                <span
                  v-for="(word, index) in testimonials[active].quote.split(' ')"
                  :key="index"
                  v-motion
                  :initial="{ filter: 'blur(10px)', opacity: 0, y: 5 }"
                  :enter="{
                    filter: 'blur(0px)',
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 200,
                      delay: 20 * index,
                    },
                  }"
                  class="inline-block"
                >
                  {{ word }}&nbsp;
                </span>
              </p>
            </div>
          </TransitionGroup>
        </div>

        <!-- Navigation buttons -->
        <div class="flex gap-4 pt-12 md:pt-0">
          <button
            @click="handlePrev"
            class="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
          >
            <IconArrowLeft class="h-5 w-5 text-foreground group-hover/button:rotate-12 transition-transform duration-300" />
          </button>
          <button
            @click="handleNext"
            class="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
          >
            <IconArrowRight class="h-5 w-5 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'

interface Testimonial {
  quote: string
  name: string
  designation: string
  src: string
}

interface Props {
  testimonials: Testimonial[]
  autoplay?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
  className: '',
})

// Placeholder icons (you can replace with actual icon components)
const IconArrowLeft = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>'
}

const IconArrowRight = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>'
}

const active = ref(0)
let interval: ReturnType<typeof setInterval> | null = null

const handleNext = () => {
  active.value = (active.value + 1) % props.testimonials.length
}

const handlePrev = () => {
  active.value = (active.value - 1 + props.testimonials.length) % props.testimonials.length
}

const randomRotateY = () => {
  return Math.floor(Math.random() * 21) - 10
}

onMounted(() => {
  if (props.autoplay) {
    interval = setInterval(handleNext, 5000)
  }
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<style scoped>
.testimonial-enter-active,
.testimonial-leave-active {
  transition: all 0.4s ease-in-out;
}

.testimonial-enter-from {
  opacity: 0;
  transform: scale(0.9) rotateY(10deg);
}

.testimonial-leave-to {
  opacity: 0;
  transform: scale(0.9) rotateY(-10deg);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
