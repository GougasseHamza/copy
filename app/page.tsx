'use client'

import Link from 'next/link'
import { Globe } from '@/components/ui/Globe'
import { Spotlight } from '@/components/ui/Spotlight'
import { AnimatedTestimonials } from '@/components/ui/AnimatedTestimonials'
import { Card } from '@/components/ui/Card'

const testimonials = [
  {
    quote: "PharmFinder m'a aidé à trouver des médicaments urgents pour ma mère à 2h du matin. Service incroyable!",
    name: "Fatima Zahra",
    designation: "Cliente à Casablanca",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    quote: "En tant que pharmacien, cette plateforme m'a permis de mieux gérer mon inventaire et d'aider plus de patients.",
    name: "Dr. Mehdi Alami",
    designation: "Pharmacien à Rabat",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    quote: "Application fantastique! Je peux vérifier la disponibilité des médicaments avant de me déplacer.",
    name: "Youssef Bennani",
    designation: "Client à Marrakech",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  }
]

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section with Spotlight */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-nature-50 to-background dark:from-nature-950 dark:to-background">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="hsl(142 70% 45%)" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-nature-700 to-nature-500 bg-clip-text text-transparent">
                Trouvez Votre Pharmacie
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                Localisez les pharmacies près de chez vous et vérifiez la disponibilité des médicaments en temps réel au Maroc
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/pharmacies"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
                >
                  Trouver une Pharmacie
                </Link>
                <Link
                  href="/products"
                  className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg text-lg font-semibold hover:bg-secondary/90 transition-all hover:scale-105"
                >
                  Rechercher un Médicament
                </Link>
              </div>
            </div>

            {/* Right - Globe */}
            <div className="relative h-[400px] lg:h-[600px]">
              <Globe className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">Pourquoi PharmFinder?</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            La solution complète pour vos besoins pharmaceutiques
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Localisation en Temps Réel</h3>
              <p className="text-muted-foreground">
                Trouvez instantanément les pharmacies ouvertes les plus proches de votre position avec navigation GPS intégrée
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Disponibilité des Médicaments</h3>
              <p className="text-muted-foreground">
                Vérifiez la disponibilité des médicaments avant de vous déplacer. Économisez du temps et des efforts
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Service 24/7</h3>
              <p className="text-muted-foreground">
                Accédez aux informations des pharmacies de garde à tout moment, jour et nuit, pour les urgences
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-lg text-muted-foreground">Pharmacies Partenaires</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-lg text-muted-foreground">Médicaments Répertoriés</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">50K+</div>
              <div className="text-lg text-muted-foreground">Utilisateurs Actifs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">Ce Que Disent Nos Utilisateurs</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Des milliers de Marocains nous font confiance chaque jour
          </p>
          <AnimatedTestimonials testimonials={testimonials} autoplay />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-nature-600 to-nature-500 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à Simplifier Votre Recherche?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Rejoignez des milliers d&apos;utilisateurs qui trouvent leurs médicaments plus rapidement avec PharmFinder
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="px-8 py-4 bg-white text-nature-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
            >
              Créer un Compte Gratuit
            </Link>
            <Link
              href="/pharmacies"
              className="px-8 py-4 bg-nature-700 text-white rounded-lg text-lg font-semibold hover:bg-nature-800 transition-all hover:scale-105"
            >
              Commencer Maintenant
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
