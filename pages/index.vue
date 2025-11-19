<template>
  <NuxtLayout name="default">
    <div class="relative">
      <!-- Hero Section -->
      <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div class="container-custom py-24 md:py-32">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <!-- Left Content -->
            <div ref="heroContent" class="space-y-6 opacity-0">
              <div class="inline-block">
                <span class="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                  🏥 Service médical innovant
                </span>
              </div>
              
              <h1 class="text-5xl md:text-6xl font-bold tracking-tight">
                Trouvez votre
                <span class="text-primary block mt-2">Pharmacie</span>
                en un instant
              </h1>
              
              <p class="text-lg text-muted-foreground max-w-lg">
                Localisez les pharmacies près de chez vous, consultez la disponibilité des médicaments en temps réel et bénéficiez de conseils personnalisés.
              </p>

              <!-- Search Bar -->
              <div class="flex flex-col sm:flex-row gap-3 max-w-xl">
                <div class="relative flex-1">
                  <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Rechercher un médicament..."
                    class="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <NuxtLink to="/pharmacies" class="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors">
                  <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Trouver
                </NuxtLink>
              </div>

              <!-- Stats -->
              <div class="flex gap-8 pt-4">
                <div>
                  <div class="text-3xl font-bold text-primary">250+</div>
                  <div class="text-sm text-muted-foreground">Pharmacies</div>
                </div>
                <div>
                  <div class="text-3xl font-bold text-primary">5000+</div>
                  <div class="text-sm text-muted-foreground">Médicaments</div>
                </div>
                <div>
                  <div class="text-3xl font-bold text-primary">24/7</div>
                  <div class="text-sm text-muted-foreground">Service</div>
                </div>
              </div>
            </div>

            <!-- Right Image/Illustration -->
            <div ref="heroImage" class="relative opacity-0">
              <div class="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&h=600&fit=crop" 
                  alt="Pharmacie" 
                  class="rounded-2xl shadow-2xl"
                />
              </div>
              <!-- Floating Cards -->
              <div ref="floatingCard1" class="absolute -top-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg opacity-0">
                <div class="flex items-center gap-3">
                  <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm font-medium">En stock</div>
                    <div class="text-xs text-muted-foreground">Disponible maintenant</div>
                  </div>
                </div>
              </div>
              
              <div ref="floatingCard2" class="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg opacity-0">
                <div class="flex items-center gap-3">
                  <div class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm font-medium">Ouverte 24h</div>
                    <div class="text-xs text-muted-foreground">Service continu</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Wave Separator -->
        <div class="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="currentColor" class="text-background"/>
          </svg>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20">
        <div class="container-custom">
          <div ref="featuresTitle" class="text-center mb-16 opacity-0">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir PharmFinder ?</h2>
            <p class="text-muted-foreground max-w-2xl mx-auto">
              Une plateforme moderne pour simplifier votre accès aux soins pharmaceutiques
            </p>
          </div>

          <div ref="featuresGrid" class="grid md:grid-cols-3 gap-8 opacity-0">
            <!-- Feature 1 -->
            <div class="group p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Localisation précise</h3>
              <p class="text-muted-foreground">
                Trouvez instantanément les pharmacies les plus proches avec leur distance et temps d'accès en temps réel.
              </p>
            </div>

            <!-- Feature 2 -->
            <div class="group p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Stock en temps réel</h3>
              <p class="text-muted-foreground">
                Consultez la disponibilité des médicaments avant de vous déplacer et économisez votre temps.
              </p>
            </div>

            <!-- Feature 3 -->
            <div class="group p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Assistant IA</h3>
              <p class="text-muted-foreground">
                Obtenez des recommandations personnalisées de médicaments basées sur vos symptômes avec notre chatbot intelligent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-primary text-primary-foreground">
        <div class="container-custom">
          <div ref="ctaSection" class="text-center max-w-3xl mx-auto opacity-0">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
              Prêt à commencer ?
            </h2>
            <p class="text-lg mb-8 opacity-90">
              Rejoignez des milliers d'utilisateurs qui font confiance à PharmFinder pour leurs besoins pharmaceutiques.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink to="/pharmacies" class="inline-flex items-center justify-center rounded-lg bg-white text-primary px-8 py-3 text-sm font-medium shadow hover:bg-white/90 transition-colors">
                Explorer les pharmacies
                <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </NuxtLink>
              <NuxtLink to="/chatbot" class="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
                Essayer l'assistant
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const heroContent = ref<HTMLElement | null>(null)
const heroImage = ref<HTMLElement | null>(null)
const floatingCard1 = ref<HTMLElement | null>(null)
const floatingCard2 = ref<HTMLElement | null>(null)
const featuresTitle = ref<HTMLElement | null>(null)
const featuresGrid = ref<HTMLElement | null>(null)
const ctaSection = ref<HTMLElement | null>(null)

onMounted(() => {
  // Hero animations
  const tl = gsap.timeline()
  
  tl.to(heroContent.value, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  .to(heroImage.value, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.4')
  .to(floatingCard1.value, {
    opacity: 1,
    x: 0,
    y: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
  }, '-=0.3')
  .to(floatingCard2.value, {
    opacity: 1,
    x: 0,
    y: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
  }, '-=0.4')

  // Features animation on scroll
  gsap.to(featuresTitle.value, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: featuresTitle.value,
      start: 'top 80%'
    }
  })

  gsap.to(featuresGrid.value, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: featuresGrid.value,
      start: 'top 80%'
    }
  })

  gsap.to(ctaSection.value, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: ctaSection.value,
      start: 'top 80%'
    }
  })

  // Floating animation for cards
  gsap.to(floatingCard1.value, {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  gsap.to(floatingCard2.value, {
    y: -10,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
})

useHead({
  title: 'PharmFinder - Trouvez votre pharmacie',
  meta: [
    { name: 'description', content: 'Trouvez les pharmacies près de chez vous et consultez la disponibilité des médicaments en temps réel au Maroc.' }
  ]
})
</script>

<style scoped>
/* Initial states for GSAP animations */
</style>
