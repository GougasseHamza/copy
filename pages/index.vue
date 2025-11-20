<template>
  <NuxtLayout name="default">
    <div class="relative">
      <!-- Spline Hero Section -->
      <section id="home" class="relative overflow-hidden min-h-screen flex items-center py-20">
        <Card class="w-full min-h-[90vh] bg-gradient-to-br from-beige-800/95 via-beige-700/95 to-earth-700/95 relative overflow-hidden border-none">
          <!-- Spotlight Effect -->
          <Spotlight
            class-name="-top-40 left-0 md:left-60 md:-top-20"
            :fill="'#d4a574'"
          />

          <div class="flex flex-col lg:flex-row h-full min-h-[90vh]">
            <!-- Left Content -->
            <div ref="heroContent" class="flex-1 p-8 md:p-16 relative z-10 flex flex-col justify-center opacity-0">
              <div class="inline-block mb-6 w-fit">
                <span class="bg-beige-200/30 text-beige-50 px-6 py-3 rounded-full text-sm font-semibold border border-beige-200/40 backdrop-blur-md">
                  💊 Trouvez vos médicaments en temps réel
                </span>
              </div>

              <h1 ref="heroTitle" class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 opacity-0">
                <span class="bg-gradient-to-r from-beige-50 via-beige-100 to-earth-100 bg-clip-text text-transparent">
                  Votre Pharmacie,
                </span>
                <span class="block mt-3 bg-gradient-to-r from-earth-200 to-beige-200 bg-clip-text text-transparent">
                  À Portée de Main
                </span>
              </h1>

              <p ref="heroDesc" class="text-xl md:text-2xl text-beige-50/90 max-w-2xl leading-relaxed mb-10 opacity-0">
                Localisez les pharmacies proches, vérifiez la disponibilité des médicaments et obtenez des conseils pharmaceutiques en quelques clics.
              </p>

              <!-- CTA Buttons -->
              <div ref="heroButtons" class="flex flex-col sm:flex-row gap-6 mb-12 opacity-0">
                <NuxtLink to="/pharmacies" class="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-nature-500 to-nature-600 px-10 py-5 text-lg font-semibold text-white shadow-2xl shadow-nature-500/40 hover:shadow-nature-500/60 hover:scale-105 transition-all duration-300">
                  <span class="mr-2 text-2xl">📍</span>
                  Trouver une Pharmacie
                  <svg class="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </NuxtLink>
                <NuxtLink to="/products" class="inline-flex items-center justify-center rounded-2xl border-2 border-beige-100 text-beige-50 px-10 py-5 text-lg font-semibold hover:bg-beige-200/20 backdrop-blur-sm transition-all duration-300">
                  <span class="mr-2 text-2xl">💊</span>
                  Rechercher un Médicament
                </NuxtLink>
              </div>

              <!-- Stats -->
              <div ref="heroStats" class="flex gap-8 lg:gap-12 opacity-0">
                <div class="group">
                  <div class="text-4xl md:text-5xl font-bold bg-gradient-to-br from-beige-50 to-earth-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    500+
                  </div>
                  <div class="text-xs md:text-sm text-beige-100/90 flex items-center gap-1 mt-2">
                    🏥 Pharmacies
                  </div>
                </div>
                <div class="group">
                  <div class="text-4xl md:text-5xl font-bold bg-gradient-to-br from-beige-50 to-earth-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    10K+
                  </div>
                  <div class="text-xs md:text-sm text-beige-100/90 flex items-center gap-1 mt-2">
                    💊 Médicaments
                  </div>
                </div>
                <div class="group">
                  <div class="text-4xl md:text-5xl font-bold bg-gradient-to-br from-beige-50 to-earth-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    24/7
                  </div>
                  <div class="text-xs md:text-sm text-beige-100/90 flex items-center gap-1 mt-2">
                    ⏰ Disponible
                  </div>
                </div>
              </div>
            </div>

            <!-- Right - Spline Scene -->
            <div class="flex-1 relative min-h-[400px] lg:min-h-full">
              <ClientOnly>
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  class="w-full h-full"
                />
                <template #fallback>
                  <div class="w-full h-full flex items-center justify-center bg-beige-700/50 rounded-lg">
                    <div class="text-center">
                      <div class="inline-block mb-4">
                        <span class="loader"></span>
                      </div>
                      <div class="text-beige-50 text-lg">Loading 3D Scene...</div>
                    </div>
                  </div>
                </template>
              </ClientOnly>
            </div>
          </div>
        </Card>

        <!-- Organic Wave Separator -->
        <div class="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="currentColor" class="text-background"/>
          </svg>
        </div>
      </section>

      <!-- Container Scroll Section - Services Showcase -->
      <section id="problem" class="bg-gradient-to-br from-beige-50 to-earth-50 dark:from-beige-800 dark:to-beige-700">
        <ContainerScroll>
          <template #title>
            <div class="space-y-4">
              <div class="inline-block mb-4">
                <span class="text-earth-600 dark:text-beige-200 font-semibold text-sm uppercase tracking-wider">
                  💊 Services Pharmaceutiques
                </span>
              </div>
              <h2 class="text-5xl md:text-7xl font-bold bg-gradient-to-r from-beige-800 to-earth-500 dark:from-beige-200 dark:to-earth-200 bg-clip-text text-transparent">
                Simplifiez Vos Achats
              </h2>
              <p class="text-beige-700/70 dark:text-beige-100/70 text-lg max-w-3xl mx-auto leading-relaxed">
                Tout ce dont vous avez besoin pour gérer vos besoins pharmaceutiques en un seul endroit
              </p>
            </div>
          </template>

          <!-- Services Content -->
          <div class="w-full h-full bg-gradient-to-br from-beige-50 to-earth-50 dark:from-beige-700 dark:to-beige-600 p-8 md:p-12 overflow-auto">
            <div class="grid md:grid-cols-3 gap-8">
              <!-- Service 1 -->
              <div class="group p-8 rounded-3xl border-2 border-beige-200 dark:border-beige-600 bg-gradient-to-br from-beige-50 to-white dark:from-beige-700 dark:to-beige-800 hover:shadow-2xl hover:shadow-nature-400/20 transition-all duration-500">
                <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-nature-400 to-nature-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-nature-400/30">
                  <span class="text-3xl">📍</span>
                </div>
                <h3 class="text-2xl font-bold mb-3 text-beige-800 dark:text-beige-50">Géolocalisation</h3>
                <p class="text-beige-600 dark:text-beige-200 leading-relaxed">
                  Trouvez rapidement les pharmacies les plus proches de vous avec notre système de localisation en temps réel.
                </p>
              </div>

              <!-- Service 2 -->
              <div class="group p-8 rounded-3xl border-2 border-beige-200 dark:border-beige-600 bg-gradient-to-br from-earth-50 to-white dark:from-beige-700 dark:to-beige-800 hover:shadow-2xl hover:shadow-earth-400/20 transition-all duration-500">
                <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-earth-300 to-earth-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-earth-300/30">
                  <span class="text-3xl">💊</span>
                </div>
                <h3 class="text-2xl font-bold mb-3 text-beige-800 dark:text-beige-50">Disponibilité</h3>
                <p class="text-beige-600 dark:text-beige-200 leading-relaxed">
                  Vérifiez la disponibilité de vos médicaments dans les pharmacies avant de vous déplacer.
                </p>
              </div>

              <!-- Service 3 -->
              <div class="group p-8 rounded-3xl border-2 border-beige-200 dark:border-beige-600 bg-gradient-to-br from-beige-50 to-white dark:from-beige-700 dark:to-beige-800 hover:shadow-2xl hover:shadow-nature-400/20 transition-all duration-500">
                <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-nature-500 to-nature-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-nature-500/30">
                  <span class="text-3xl">🤖</span>
                </div>
                <h3 class="text-2xl font-bold mb-3 text-beige-800 dark:text-beige-50">Assistant IA</h3>
                <p class="text-beige-600 dark:text-beige-200 leading-relaxed">
                  Obtenez des conseils pharmaceutiques personnalisés grâce à notre assistant intelligent disponible 24/7.
                </p>
              </div>
            </div>

            <!-- Additional Features -->
            <div class="mt-12 grid md:grid-cols-2 gap-8">
              <div class="p-6 rounded-2xl bg-beige-100/50 dark:bg-beige-700/30 border border-beige-200 dark:border-beige-600">
                <h4 class="text-xl font-bold text-beige-800 dark:text-beige-50 mb-3">⏰ Pharmacies de Garde</h4>
                <p class="text-beige-600 dark:text-beige-200">
                  Accédez instantanément aux informations sur les pharmacies de garde près de chez vous, disponibles 24h/24.
                </p>
              </div>
              <div class="p-6 rounded-2xl bg-earth-100/50 dark:bg-beige-700/30 border border-earth-200 dark:border-beige-600">
                <h4 class="text-xl font-bold text-beige-800 dark:text-beige-50 mb-3">🔔 Notifications</h4>
                <p class="text-beige-600 dark:text-beige-200">
                  Recevez des alertes lorsque vos médicaments sont disponibles et ne manquez plus jamais vos renouvellements.
                </p>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </section>

      <!-- Globe Section - Global Reach -->
      <section id="solution" class="relative overflow-hidden bg-gradient-to-br from-beige-50 via-earth-50 to-beige-100 dark:from-beige-700 dark:via-beige-600 dark:to-earth-700 py-32">
        <div class="container-custom relative z-10">
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <!-- Left - Globe Component -->
            <div ref="globeSection" class="relative h-[600px] opacity-0">
              <div class="absolute inset-0 bg-gradient-to-tr from-earth-300/20 to-transparent rounded-full blur-3xl"></div>
              <Globe :config="globeConfig" />
            </div>

            <!-- Right Content -->
            <div class="space-y-8">
              <div class="inline-block">
                <span class="bg-earth-400/20 text-earth-700 dark:text-beige-100 px-5 py-2 rounded-full text-sm font-semibold border border-earth-400/30">
                  🇲🇦 Couverture Nationale
                </span>
              </div>

              <h2 class="text-5xl md:text-6xl font-bold tracking-tight">
                <span class="bg-gradient-to-r from-beige-900 to-earth-600 dark:from-beige-100 dark:to-earth-100 bg-clip-text text-transparent">
                  Partout au Maroc
                </span>
                <span class="block mt-3 text-beige-700 dark:text-beige-200">
                  À Votre Service
                </span>
              </h2>

              <p class="text-xl text-beige-700/80 dark:text-beige-100/80 max-w-lg leading-relaxed">
                Notre réseau couvre tout le Maroc avec des centaines de pharmacies partenaires de Casablanca à Marrakech, Rabat, Tanger et au-delà.
              </p>

              <!-- Features List -->
              <div class="space-y-4">
                <div class="flex items-start gap-4 p-4 rounded-xl bg-beige-100/50 dark:bg-beige-700/30 border border-beige-200 dark:border-beige-600">
                  <span class="text-3xl">🗺️</span>
                  <div>
                    <h4 class="font-bold text-beige-800 dark:text-beige-50 mb-1">Carte Interactive</h4>
                    <p class="text-sm text-beige-600 dark:text-beige-200">Visualisez toutes les pharmacies sur une carte interactive avec itinéraires</p>
                  </div>
                </div>
                <div class="flex items-start gap-4 p-4 rounded-xl bg-earth-100/50 dark:bg-beige-700/30 border border-earth-200 dark:border-beige-600">
                  <span class="text-3xl">📱</span>
                  <div>
                    <h4 class="font-bold text-beige-800 dark:text-beige-50 mb-1">Application Mobile</h4>
                    <p class="text-sm text-beige-600 dark:text-beige-200">Accédez à vos médicaments où que vous soyez avec notre app</p>
                  </div>
                </div>
                <div class="flex items-start gap-4 p-4 rounded-xl bg-beige-100/50 dark:bg-beige-700/30 border border-beige-200 dark:border-beige-600">
                  <span class="text-3xl">⚡</span>
                  <div>
                    <h4 class="font-bold text-beige-800 dark:text-beige-50 mb-1">Mises à Jour Temps Réel</h4>
                    <p class="text-sm text-beige-600 dark:text-beige-200">Stocks et disponibilités actualisés en direct</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section ref="testimonialsSection" class="py-28 bg-gradient-to-br from-beige-100 to-earth-50 dark:from-beige-700 dark:to-beige-600 opacity-0">
        <div class="container-custom">
          <div class="text-center mb-16">
            <h2 class="text-5xl font-bold mb-4 bg-gradient-to-r from-beige-900 to-earth-600 bg-clip-text text-transparent">
              Ils Nous Font Confiance
            </h2>
            <p class="text-beige-700/70 dark:text-beige-100/70 text-lg">
              Découvrez ce que nos utilisateurs pensent de PharmFinder
            </p>
          </div>
          <AnimatedTestimonials :testimonials="testimonials" :autoplay="true" />
        </div>
      </section>

      <!-- CTA Section with Nature Theme -->
      <section id="contact" class="py-32 relative overflow-hidden">
        <!-- Gradient Background -->
        <div class="absolute inset-0 bg-gradient-to-br from-nature-600 via-earth-500 to-beige-600"></div>

        <!-- Overlay Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.4&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
        </div>

        <div class="container-custom relative z-10">
          <div ref="ctaSection" class="text-center max-w-4xl mx-auto opacity-0">
            <div class="mb-6 inline-block">
              <span class="text-white/90 text-lg font-medium">💊 Simplifiez votre accès aux médicaments</span>
            </div>
            <h2 class="text-5xl md:text-6xl font-bold mb-8 text-white">
              Trouvez Votre Pharmacie<br />
              <span class="text-earth-100">En Un Clic</span>
            </h2>
            <p class="text-xl mb-12 text-white/90 leading-relaxed max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui facilitent leur accès aux médicaments avec PharmFinder.
            </p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center">
              <NuxtLink to="/pharmacies" class="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-nature-500 to-nature-600 text-white px-10 py-5 text-base font-semibold shadow-2xl shadow-nature-500/40 hover:shadow-nature-500/60 hover:scale-105 transition-all duration-300">
                <span class="mr-2 text-2xl">📍</span>
                Trouver une Pharmacie
                <svg class="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </NuxtLink>
              <NuxtLink to="/auth/signup" class="inline-flex items-center justify-center rounded-2xl border-2 border-white text-white px-10 py-5 text-base font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                <span class="mr-2 text-2xl">🚀</span>
                Créer un Compte
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Decorative Elements -->
        <div class="absolute top-10 left-10 text-8xl opacity-10 animate-pulse">💊</div>
        <div class="absolute bottom-10 right-10 text-9xl opacity-10 animate-pulse" style="animation-delay: 1s;">🏥</div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Globe from '@/components/ui/Globe.vue'
import AnimatedTestimonials from '@/components/ui/AnimatedTestimonials.vue'
import SplineScene from '@/components/ui/SplineScene.vue'
import ContainerScroll from '@/components/ui/ContainerScroll.vue'
import Card from '@/components/ui/Card.vue'
import Spotlight from '@/components/ui/Spotlight.vue'

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
    quote: "PharmFinder m'a sauvé la vie ! J'ai pu trouver mon médicament urgent à 2h du matin grâce à la liste des pharmacies de garde. Interface super intuitive.",
    name: "Amina Benjelloun",
    designation: "Utilisatrice depuis 2023",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
  },
  {
    quote: "En tant que pharmacien, cette plateforme nous aide énormément. Nos patients peuvent vérifier les stocks avant de se déplacer. Très pratique !",
    name: "Youssef Alami",
    designation: "Pharmacien partenaire",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
  },
  {
    quote: "Fini les appels interminables pour trouver un médicament ! Avec PharmFinder, je vérifie la disponibilité en temps réel. Un gain de temps incroyable.",
    name: "Sofia Rahimi",
    designation: "Cliente fidèle",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
  },
  {
    quote: "L'assistant IA est impressionnant. Il m'a aidé à trouver l'équivalent de mon médicament habituel quand il était en rupture. Très intelligent !",
    name: "Karim Tazi",
    designation: "Utilisateur régulier",
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
  title: 'PharmFinder - Trouvez Vos Pharmacies et Médicaments au Maroc',
  meta: [
    { name: 'description', content: 'Localisez les pharmacies proches, vérifiez la disponibilité des médicaments en temps réel et accédez aux pharmacies de garde 24/7 partout au Maroc avec PharmFinder.' }
  ]
})
</script>

<style scoped>
/* Initial states for GSAP animations */

/* Loader for Spline Scene */
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid rgba(212, 165, 116, 0.3);
  border-bottom-color: #d4a574;
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
