<template>
  <nav
    ref="containerRef"
    class="relative rounded-full transition-all duration-300"
    :class="{ 'translate-y-[-120px] opacity-0': isHidden }"
    :style="{
      width: `${pillWidth}px`,
      height: '56px',
      background: `
        linear-gradient(135deg,
          #fcfcfd 0%,
          #f8f8fa 15%,
          #f3f4f6 30%,
          #eeeff2 45%,
          #e9eaed 60%,
          #e4e5e8 75%,
          #dee0e3 90%,
          #e2e3e6 100%
        )
      `,
      boxShadow: expanded
        ? `
          0 2px 4px rgba(0, 0, 0, 0.08),
          0 6px 12px rgba(0, 0, 0, 0.12),
          0 12px 24px rgba(0, 0, 0, 0.14),
          0 24px 48px rgba(0, 0, 0, 0.10),
          inset 0 2px 2px rgba(255, 255, 255, 0.8),
          inset 0 -3px 8px rgba(0, 0, 0, 0.12),
          inset 3px 3px 8px rgba(0, 0, 0, 0.10),
          inset -3px 3px 8px rgba(0, 0, 0, 0.09),
          inset 0 -1px 2px rgba(0, 0, 0, 0.08)
        `
        : isTransitioning
        ? `
          0 3px 6px rgba(0, 0, 0, 0.10),
          0 8px 16px rgba(0, 0, 0, 0.08),
          0 16px 32px rgba(0, 0, 0, 0.06),
          0 1px 2px rgba(0, 0, 0, 0.10),
          inset 0 2px 1px rgba(255, 255, 255, 0.85),
          inset 0 -2px 6px rgba(0, 0, 0, 0.08),
          inset 2px 2px 8px rgba(0, 0, 0, 0.06),
          inset -2px 2px 8px rgba(0, 0, 0, 0.05),
          inset 0 0 1px rgba(0, 0, 0, 0.12),
          inset 0 0 20px rgba(255, 255, 255, 0.15)
        `
        : `
          0 3px 6px rgba(0, 0, 0, 0.12),
          0 8px 16px rgba(0, 0, 0, 0.10),
          0 16px 32px rgba(0, 0, 0, 0.08),
          0 1px 2px rgba(0, 0, 0, 0.12),
          inset 0 2px 1px rgba(255, 255, 255, 0.7),
          inset 0 -2px 6px rgba(0, 0, 0, 0.10),
          inset 2px 2px 8px rgba(0, 0, 0, 0.08),
          inset -2px 2px 8px rgba(0, 0, 0, 0.07),
          inset 0 0 1px rgba(0, 0, 0, 0.15)
        `,
      overflow: 'hidden',
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Light effects and ridges -->
    <div
      class="absolute inset-x-0 top-0 rounded-t-full pointer-events-none"
      style="
        height: 2px;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 5%, rgba(255, 255, 255, 1) 15%, rgba(255, 255, 255, 1) 85%, rgba(255, 255, 255, 0.95) 95%, rgba(255, 255, 255, 0) 100%);
        filter: blur(0.3px);
      "
    />

    <div
      class="absolute inset-x-0 top-0 rounded-full pointer-events-none"
      style="
        height: 55%;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.10) 60%, rgba(255, 255, 255, 0) 100%);
      "
    />

    <div
      class="absolute inset-0 rounded-full pointer-events-none"
      style="
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.20) 20%, rgba(255, 255, 255, 0.08) 40%, rgba(255, 255, 255, 0) 65%);
      "
    />

    <div
      class="absolute rounded-full pointer-events-none transition-all duration-300"
      :style="{
        left: expanded ? '18%' : '15%',
        top: '16%',
        width: expanded ? '140px' : '60px',
        height: '14px',
        background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.35) 40%, rgba(255, 255, 255, 0.10) 70%, rgba(255, 255, 255, 0) 100%)',
        filter: 'blur(4px)',
        transform: 'rotate(-12deg)',
      }"
    />

    <!-- Navigation items container -->
    <div
      class="relative z-10 h-full flex items-center justify-center px-6"
      style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'SF Pro', Poppins, sans-serif"
    >
      <!-- Collapsed state -->
      <div v-if="!expanded" class="flex items-center relative">
        <Transition name="slide" mode="out-in">
          <span
            :key="activeRoute"
            :style="{
              fontSize: '15.5px',
              fontWeight: 680,
              color: '#1a1a1a',
              letterSpacing: '0.45px',
              whiteSpace: 'nowrap',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, SF Pro Display, Poppins, sans-serif',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              textShadow: `
                0 1px 0 rgba(0, 0, 0, 0.35),
                0 -1px 0 rgba(255, 255, 255, 0.8),
                1px 1px 0 rgba(0, 0, 0, 0.18),
                -1px 1px 0 rgba(0, 0, 0, 0.15)
              `,
            }"
          >
            {{ navItems.value.find(item => item.path === activeRoute)?.label || 'Accueil' }}
          </span>
        </Transition>
      </div>

      <!-- Expanded state -->
      <div v-if="expanded" class="flex items-center justify-evenly w-full">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="relative cursor-pointer transition-all duration-200 outline-none"
          :style="getButtonStyle(item.path === activeRoute)"
          @mouseenter="(e) => handleButtonHover(e, item.path === activeRoute)"
          @mouseleave="(e) => handleButtonLeave(e, item.path === activeRoute)"
          @click="handleNavClick"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'

interface NavItem {
  label: string
  path: string
}

const route = useRoute()
const { isAuthenticated } = useAuth()
const activeRoute = computed(() => route.path)
const expanded = ref(false)
const hovering = ref(false)
const isTransitioning = ref(false)
const pillWidth = ref(180)
const containerRef = ref<HTMLElement | null>(null)
const isHidden = ref(false)
const lastScrollY = ref(0)
const scrollThreshold = 100

// Dynamic nav items based on authentication state
const navItems = computed<NavItem[]>(() => {
  const baseItems: NavItem[] = [
    { label: 'Accueil', path: '/' },
    { label: 'Pharmacies', path: '/pharmacies' },
    { label: 'Produits', path: '/products' },
    { label: 'Assistant', path: '/chatbot' },
  ]

  // Show Dashboard if authenticated, otherwise show Connexion
  if (isAuthenticated.value) {
    baseItems.push({ label: 'Dashboard', path: '/staff' })
  } else {
    baseItems.push({ label: 'Connexion', path: '/auth/login' })
  }

  return baseItems
})

let hoverTimeout: ReturnType<typeof setTimeout> | null = null

watch(hovering, (newValue) => {
  if (newValue) {
    expanded.value = true
    pillWidth.value = 650
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
  } else {
    hoverTimeout = setTimeout(() => {
      expanded.value = false
      pillWidth.value = 180
    }, 600)
  }
})

const handleMouseEnter = () => {
  hovering.value = true
}

const handleMouseLeave = () => {
  hovering.value = false
}

const handleNavClick = () => {
  isTransitioning.value = true
  hovering.value = false

  setTimeout(() => {
    isTransitioning.value = false
  }, 400)
}

const getButtonStyle = (isActive: boolean) => {
  return {
    fontSize: isActive ? '15.5px' : '15px',
    fontWeight: isActive ? 680 : 510,
    color: isActive ? '#1a1a1a' : '#656565',
    textDecoration: 'none',
    letterSpacing: '0.45px',
    background: 'transparent',
    border: 'none',
    padding: '10px 16px',
    whiteSpace: 'nowrap',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, SF Pro Display, Poppins, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    transform: isActive ? 'translateY(-1.5px)' : 'translateY(0)',
    textShadow: isActive
      ? `
        0 1px 0 rgba(0, 0, 0, 0.35),
        0 -1px 0 rgba(255, 255, 255, 0.8),
        1px 1px 0 rgba(0, 0, 0, 0.18),
        -1px 1px 0 rgba(0, 0, 0, 0.15)
      `
      : `
        0 1px 0 rgba(0, 0, 0, 0.22),
        0 -1px 0 rgba(255, 255, 255, 0.65),
        1px 1px 0 rgba(0, 0, 0, 0.12),
        -1px 1px 0 rgba(0, 0, 0, 0.10)
      `,
  }
}

const handleButtonHover = (e: MouseEvent, isActive: boolean) => {
  if (!isActive) {
    const target = e.currentTarget as HTMLElement
    target.style.color = '#3a3a3a'
    target.style.transform = 'translateY(-0.5px)'
    target.style.textShadow = `
      0 1px 0 rgba(0, 0, 0, 0.28),
      0 -1px 0 rgba(255, 255, 255, 0.72),
      1px 1px 0 rgba(0, 0, 0, 0.15),
      -1px 1px 0 rgba(0, 0, 0, 0.12)
    `
  }
}

const handleButtonLeave = (e: MouseEvent, isActive: boolean) => {
  if (!isActive) {
    const target = e.currentTarget as HTMLElement
    target.style.color = '#656565'
    target.style.transform = 'translateY(0)'
    target.style.textShadow = `
      0 1px 0 rgba(0, 0, 0, 0.22),
      0 -1px 0 rgba(255, 255, 255, 0.65),
      1px 1px 0 rgba(0, 0, 0, 0.12),
      -1px 1px 0 rgba(0, 0, 0, 0.10)
    `
  }
}

const handleScroll = () => {
  if (typeof window === 'undefined') return

  const currentScrollY = window.scrollY

  // Always show at the top
  if (currentScrollY < scrollThreshold) {
    isHidden.value = false
    lastScrollY.value = currentScrollY
    return
  }

  // Show navbar when scrolling up, hide when scrolling down
  if (currentScrollY < lastScrollY.value) {
    // Scrolling up
    isHidden.value = false
  } else if (currentScrollY > lastScrollY.value) {
    // Scrolling down and past threshold
    isHidden.value = true
  }

  lastScrollY.value = currentScrollY
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    // Ensure navbar is visible on mount
    isHidden.value = false
    lastScrollY.value = window.scrollY

    window.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onUnmounted(() => {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
  filter: blur(4px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  filter: blur(4px);
}
</style>
