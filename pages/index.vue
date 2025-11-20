<template>
  <NuxtLayout name="default">
    <div class="relative">
      <!-- Fixed Navigation Pill -->
      <div class="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <NavigationPill />
      </div>

      <!-- Spline Hero Section -->
      <section id="home" class="relative overflow-hidden bg-gradient-to-br from-nature-900 via-nature-800 to-earth-900 min-h-screen flex items-center">
        <!-- Spline Scene Background -->
        <div class="absolute inset-0 z-0">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            class="w-full h-full"
          />
        </div>

        <!-- Green Nature Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-nature-900/70 via-nature-800/60 to-transparent z-10"></div>

        <!-- Content -->
        <div class="container-custom py-32 md:py-40 relative z-20">
          <div ref="heroContent" class="max-w-4xl opacity-0">
            <div class="inline-block mb-6">
              <span class="bg-nature-400/30 text-nature-100 px-6 py-3 rounded-full text-sm font-semibold border border-nature-400/40 backdrop-blur-md">
                🌿 Plateforme éco-responsable
              </span>
            </div>

            <h1 ref="heroTitle" class="text-6xl md:text-8xl font-bold tracking-tight mb-8 opacity-0">
              <span class="bg-gradient-to-r from-nature-200 via-nature-100 to-nature-300 bg-clip-text text-transparent">
                Votre Santé,
              </span>
              <span class="block mt-3 bg-gradient-to-r from-earth-300 to-nature-200 bg-clip-text text-transparent">
                Notre Nature
              </span>
            </h1>

            <p ref="heroDesc" class="text-2xl text-nature-100/90 max-w-2xl leading-relaxed mb-10 opacity-0">
              Découvrez une approche naturelle de la santé. Trouvez les pharmacies engagées dans le développement durable près de chez vous.
            </p>

            <!-- CTA Buttons -->
            <div ref="heroButtons" class="flex flex-col sm:flex-row gap-6 opacity-0">
              <NuxtLink to="/pharmacies" class="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-nature-500 to-nature-600 px-10 py-5 text-lg font-semibold text-white shadow-2xl shadow-nature-500/40 hover:shadow-nature-500/60 hover:scale-105 transition-all duration-300">
                <span class="mr-2 text-2xl">🌿</span>
                Découvrir les Pharmacies Vertes
                <svg class="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </NuxtLink>
              <NuxtLink to="/chatbot" class="inline-flex items-center justify-center rounded-2xl border-2 border-nature-300 text-nature-100 px-10 py-5 text-lg font-semibold hover:bg-nature-400/20 backdrop-blur-sm transition-all duration-300">
                <span class="mr-2 text-2xl">💬</span>
                Assistant Naturel IA
              </NuxtLink>
            </div>

            <!-- Stats with Nature Icons -->
            <div ref="heroStats" class="flex gap-12 pt-12 opacity-0">
              <div class="group">
                <div class="text-5xl font-bold bg-gradient-to-br from-nature-200 to-nature-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  250+
                </div>
                <div class="text-sm text-nature-200/90 flex items-center gap-1 mt-2">
                  🌱 Pharmacies vertes
                </div>
              </div>
              <div class="group">
                <div class="text-5xl font-bold bg-gradient-to-br from-nature-200 to-nature-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  5000+
                </div>
                <div class="text-sm text-nature-200/90 flex items-center gap-1 mt-2">
                  🍃 Produits naturels
                </div>
              </div>
              <div class="group">
                <div class="text-5xl font-bold bg-gradient-to-br from-nature-200 to-nature-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  24/7
                </div>
                <div class="text-sm text-nature-200/90 flex items-center gap-1 mt-2">
                  ♻️ Éco-service
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Organic Wave Separator -->
        <div class="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="currentColor" class="text-background"/>
          </svg>
        </div>
      </section>

      <!-- Container Scroll Section - Services Showcase -->
      <section id="problem" class="bg-gradient-to-br from-nature-50 to-earth-50 dark:from-nature-950 dark:to-nature-900">
        <ContainerScroll>
          <template #title>
            <div class="space-y-4">
              <div class="inline-block mb-4">
                <span class="text-nature-600 dark:text-nature-400 font-semibold text-sm uppercase tracking-wider">
                  🌍 Engagement Écologique
                </span>
              </div>
              <h2 class="text-5xl md:text-7xl font-bold bg-gradient-to-r from-nature-700 to-nature-500 dark:from-nature-300 dark:to-nature-100 bg-clip-text text-transparent">
                Une Santé Durable
              </h2>
              <p class="text-nature-700/70 dark:text-nature-300/70 text-lg max-w-3xl mx-auto leading-relaxed">
                Rejoignez le mouvement pour une santé respectueuse de l'environnement
              </p>
            </div>
          </template>

          <!-- Services Content -->
          <div class="w-full h-full bg-gradient-to-br from-nature-50 to-earth-50 dark:from-nature-900 dark:to-nature-800 p-8 md:p-12 overflow-auto">
            <div class="grid md:grid-cols-3 gap-8">
              <!-- Service 1 -->
              <div class="group p-8 rounded-3xl border-2 border-nature-200 dark:border-nature-700 bg-gradient-to-br from-nature-50 to-white dark:from-nature-800 dark:to-nature-900 hover:shadow-2xl hover:shadow-nature-500/20 transition-all duration-500">
                <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-nature-500 to-nature-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-nature-500/30">
                  <span class="text-3xl">🌱</span>
                </div>
                <h3 class="text-2xl font-bold mb-3 text-nature-800 dark:text-nature-200">Bio & Naturel</h3>
                <p class="text-nature-600 dark:text-nature-300 leading-relaxed">
                  Découvrez une sélection de produits biologiques et naturels certifiés pour votre bien-être.
                </p>
              </div>

              <!-- Service 2 -->
              <div class="group p-8 rounded-3xl border-2 border-nature-200 dark:border-nature-700 bg-gradient-to-br from-earth-50 to-white dark:from-nature-800 dark:to-nature-900 hover:shadow-2xl hover:shadow-earth-500/20 transition-all duration-500">
                <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-earth-400 to-earth-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-earth-400/30">
                  <span class="text-3xl">♻️</span>
                </div>
                <h3 class="text-2xl font-bold mb-3 text-nature-800 dark:text-nature-200">Zéro Déchet</h3>
                <p class="text-nature-600 dark:text-nature-300 leading-relaxed">
                  Participez à notre programme de recyclage et réduisez votre empreinte écologique.
                </p>
              </div>

              <!-- Service 3 -->
              <div class="group p-8 rounded-3xl border-2 border-nature-200 dark:border-nature-700 bg-gradient-to-br from-nature-50 to-white dark:from-nature-800 dark:to-nature-900 hover:shadow-2xl hover:shadow-nature-500/20 transition-all duration-500">
                <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-nature-600 to-nature-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-nature-600/30">
                  <span class="text-3xl">🌿</span>
                </div>
                <h3 class="text-2xl font-bold mb-3 text-nature-800 dark:text-nature-200">Conseils Naturels</h3>
                <p class="text-nature-600 dark:text-nature-300 leading-relaxed">
                  Bénéficiez de recommandations personnalisées basées sur la phytothérapie et l'aromathérapie.
                </p>
              </div>
            </div>

            <!-- Additional Features -->
            <div class="mt-12 grid md:grid-cols-2 gap-8">
              <div class="p-6 rounded-2xl bg-nature-100/50 dark:bg-nature-800/30 border border-nature-200 dark:border-nature-700">
                <h4 class="text-xl font-bold text-nature-800 dark:text-nature-200 mb-3">🌍 Impact Environnemental</h4>
                <p class="text-nature-600 dark:text-nature-300">
                  Suivez votre empreinte écologique et contribuez à un avenir plus vert avec chaque achat responsable.
                </p>
              </div>
              <div class="p-6 rounded-2xl bg-earth-100/50 dark:bg-nature-800/30 border border-earth-200 dark:border-nature-700">
                <h4 class="text-xl font-bold text-nature-800 dark:text-nature-200 mb-3">🏥 Pharmacies Certifiées</h4>
                <p class="text-nature-600 dark:text-nature-300">
                  Toutes nos pharmacies partenaires sont certifiées pour leur engagement écologique et la qualité de leurs produits naturels.
                </p>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </section>

      <!-- Globe Section - Global Reach -->
      <section id="solution" class="relative overflow-hidden bg-gradient-to-br from-nature-50 via-earth-50 to-nature-100 dark:from-nature-900 dark:via-nature-800 dark:to-earth-900 py-32">
        <div class="container-custom relative z-10">
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <!-- Left - Globe Component -->
            <div ref="globeSection" class="relative h-[600px] opacity-0">
              <div class="absolute inset-0 bg-gradient-to-tr from-nature-400/20 to-transparent rounded-full blur-3xl"></div>
              <Globe :config="globeConfig" />
            </div>

            <!-- Right Content -->
            <div class="space-y-8">
              <div class="inline-block">
                <span class="bg-nature-500/20 text-nature-700 dark:text-nature-300 px-5 py-2 rounded-full text-sm font-semibold border border-nature-500/30">
                  🌍 Présence Mondiale
                </span>
              </div>

              <h2 class="text-5xl md:text-6xl font-bold tracking-tight">
                <span class="bg-gradient-to-r from-nature-700 to-nature-500 dark:from-nature-300 dark:to-nature-100 bg-clip-text text-transparent">
                  Un Réseau Global
                </span>
                <span class="block mt-3 text-nature-600 dark:text-nature-400">
                  Pour Votre Bien-être
                </span>
              </h2>

              <p class="text-xl text-nature-700/80 dark:text-nature-200/80 max-w-lg leading-relaxed">
                Notre réseau de pharmacies vertes s'étend à travers le Maroc et au-delà, vous garantissant un accès facile aux produits naturels de qualité où que vous soyez.
              </p>

              <!-- Features List -->
              <div class="space-y-4">
                <div class="flex items-start gap-4 p-4 rounded-xl bg-nature-100/50 dark:bg-nature-800/30 border border-nature-200 dark:border-nature-700">
                  <span class="text-3xl">📍</span>
                  <div>
                    <h4 class="font-bold text-nature-800 dark:text-nature-200 mb-1">Localisation Intelligente</h4>
                    <p class="text-sm text-nature-600 dark:text-nature-300">Trouvez les pharmacies vertes les plus proches de vous en temps réel</p>
                  </div>
                </div>
                <div class="flex items-start gap-4 p-4 rounded-xl bg-earth-100/50 dark:bg-nature-800/30 border border-earth-200 dark:border-nature-700">
                  <span class="text-3xl">🌿</span>
                  <div>
                    <h4 class="font-bold text-nature-800 dark:text-nature-200 mb-1">Produits Certifiés</h4>
                    <p class="text-sm text-nature-600 dark:text-nature-300">Tous nos produits sont certifiés biologiques et écologiques</p>
                  </div>
                </div>
                <div class="flex items-start gap-4 p-4 rounded-xl bg-nature-100/50 dark:bg-nature-800/30 border border-nature-200 dark:border-nature-700">
                  <span class="text-3xl">♻️</span>
                  <div>
                    <h4 class="font-bold text-nature-800 dark:text-nature-200 mb-1">Impact Mesurable</h4>
                    <p class="text-sm text-nature-600 dark:text-nature-300">Suivez votre contribution à un monde plus durable</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section ref="testimonialsSection" class="py-28 bg-gradient-to-br from-nature-100 to-earth-50 dark:from-nature-900 dark:to-nature-800 opacity-0">
        <div class="container-custom">
          <div class="text-center mb-16">
            <h2 class="text-5xl font-bold mb-4 bg-gradient-to-r from-nature-700 to-nature-500 bg-clip-text text-transparent">
              Témoignages Nature
            </h2>
            <p class="text-nature-700/70 dark:text-nature-300/70 text-lg">
              Ce que nos utilisateurs disent de notre engagement écologique
            </p>
          </div>
          <AnimatedTestimonials :testimonials="testimonials" :autoplay="true" />
        </div>
      </section>

      <!-- CTA Section with Nature Theme -->
      <section id="contact" class="py-32 relative overflow-hidden">
        <!-- Gradient Background -->
        <div class="absolute inset-0 bg-gradient-to-br from-nature-600 via-nature-500 to-earth-500"></div>

        <!-- Overlay Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.4&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
        </div>

        <div class="container-custom relative z-10">
          <div ref="ctaSection" class="text-center max-w-4xl mx-auto opacity-0">
            <div class="mb-6 inline-block">
              <span class="text-white/90 text-lg font-medium">🌍 Rejoignez la révolution verte</span>
            </div>
            <h2 class="text-5xl md:text-6xl font-bold mb-8 text-white">
              Ensemble pour une Santé<br />
              <span class="text-earth-100">Plus Naturelle</span>
            </h2>
            <p class="text-xl mb-12 text-white/90 leading-relaxed max-w-2xl mx-auto">
              Faites partie du changement. Adoptez une approche écologique de votre santé dès aujourd'hui.
            </p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center">
              <NuxtLink to="/pharmacies" class="group inline-flex items-center justify-center rounded-2xl bg-white text-nature-700 px-10 py-5 text-base font-semibold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                <span class="mr-2 text-2xl">🌿</span>
                Découvrir les Pharmacies Vertes
                <svg class="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </NuxtLink>
              <NuxtLink to="/chatbot" class="inline-flex items-center justify-center rounded-2xl border-2 border-white text-white px-10 py-5 text-base font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                <span class="mr-2 text-2xl">💬</span>
                Assistant Naturel IA
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Decorative Elements -->
        <div class="absolute top-10 left-10 text-8xl opacity-10 animate-pulse">🌿</div>
        <div class="absolute bottom-10 right-10 text-9xl opacity-10 animate-pulse" style="animation-delay: 1s;">🍃</div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Globe from '@/components/ui/Globe.vue'
import NavigationPill from '@/components/ui/NavigationPill.vue'
import AnimatedTestimonials from '@/components/ui/AnimatedTestimonials.vue'
import SplineScene from '@/components/ui/SplineScene.vue'
import ContainerScroll from '@/components/ui/ContainerScroll.vue'

gsap.registerPlugin(ScrollTrigger)

const heroContent = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const heroDesc = ref<HTMLElement | null>(null)
const heroButtons = ref<HTMLElement | null>(null)
const heroStats = ref<HTMLElement | null>(null)
const globeSection = ref<HTMLElement | null>(null)
const testimonialsSection = ref<HTMLElement | null>(null)
const ctaSection = ref<HTMLElement | null>(null)

// Globe configuration with nature colors
const globeConfig = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.7, 0.9, 0.7], // Soft green
  markerColor: [34 / 255, 139 / 255, 34 / 255], // Forest green
  glowColor: [0.6, 0.9, 0.6], // Light green glow
  markers: [
    { location: [31.7917, -7.0926], size: 0.1 }, // Morocco - Marrakech
    { location: [33.5731, -7.5898], size: 0.12 }, // Morocco - Casablanca
    { location: [34.0209, -6.8416], size: 0.1 }, // Morocco - Rabat
    { location: [35.7595, -5.8340], size: 0.08 }, // Morocco - Tangier
    { location: [48.8566, 2.3522], size: 0.08 }, // France - Paris
    { location: [51.5074, -0.1278], size: 0.07 }, // UK - London
    { location: [40.7128, -74.0060], size: 0.09 }, // USA - New York
  ],
}

// Testimonials data
const testimonials = [
  {
    quote: "Cette plateforme a complètement changé ma façon d'aborder ma santé. Les produits naturels recommandés sont de qualité exceptionnelle.",
    name: "Amina Benjelloun",
    designation: "Utilisatrice depuis 2023",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
  },
  {
    quote: "L'engagement écologique des pharmacies partenaires est remarquable. Enfin une plateforme qui allie santé et respect de l'environnement.",
    name: "Youssef Alami",
    designation: "Pharmacien partenaire",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
  },
  {
    quote: "Les conseils personnalisés basés sur la phytothérapie m'ont aidée à trouver des alternatives naturelles efficaces.",
    name: "Sofia Rahimi",
    designation: "Cliente fidèle",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
  },
  {
    quote: "Un service innovant qui respecte vraiment l'environnement. Le programme zéro déchet est brillamment mis en œuvre.",
    name: "Karim Tazi",
    designation: "Ambassadeur écologique",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop",
  },
]

onMounted(() => {
  // Hero entrance animation
  const tl = gsap.timeline()

  tl.to(heroContent.value, {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  })
  .to(heroTitle.value, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5')
  .to(heroDesc.value, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.4')
  .to(heroButtons.value, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'back.out(1.2)'
  }, '-=0.3')
  .to(heroStats.value, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.3')

  // Globe section scroll animation
  gsap.to(globeSection.value, {
    opacity: 1,
    scale: 1,
    duration: 1.2,
    scrollTrigger: {
      trigger: globeSection.value,
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  })

  // Testimonials scroll animation
  gsap.to(testimonialsSection.value, {
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: testimonialsSection.value,
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  })

  // CTA scroll animation
  gsap.to(ctaSection.value, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: ctaSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })
})

useHead({
  title: 'PharmFinder - Santé Naturelle & Écologique',
  meta: [
    { name: 'description', content: 'Découvrez une approche écologique de la santé. Trouvez les pharmacies vertes près de chez vous et adoptez des produits naturels certifiés au Maroc.' }
  ]
})
</script>

<style scoped>
/* Initial states for GSAP animations */
</style>
