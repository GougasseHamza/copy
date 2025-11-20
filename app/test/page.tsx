'use client'

import { Card } from '@/components/ui/Card'
import { Spotlight } from '@/components/ui/Spotlight'
import { SimpleGlobe } from '@/components/ui/SimpleGlobe'
import { AnimatedTestimonials } from '@/components/ui/AnimatedTestimonials'

const testimonials = [
  {
    quote: "Test quote 1",
    name: "Test User 1",
    designation: "Tester",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    quote: "Test quote 2",
    name: "Test User 2",
    designation: "Tester 2",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  }
]

export default function TestPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Component Test Page</h1>

      {/* Test basic Card */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Card Component:</h2>
        <Card className="p-6 max-w-md">
          <p>✓ If you see this in a bordered box, Card works!</p>
        </Card>
      </div>

      {/* Test basic styling */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Tailwind Test:</h2>
        <div className="bg-primary text-primary-foreground p-4 rounded-lg max-w-md">
          ✓ This should be green with white text
        </div>
      </div>

      {/* Test Spotlight */}
      <div className="mb-8 relative h-64 bg-muted rounded-lg overflow-hidden">
        <h2 className="text-2xl font-semibold mb-4 relative z-10 p-4">3. Spotlight Component:</h2>
        <Spotlight className="top-0 left-0" fill="hsl(142 70% 45%)" />
        <p className="relative z-10 p-4">You should see a green glowing spotlight effect animating in</p>
      </div>

      {/* Test Simple Globe */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Simple Globe Component (COBE Test):</h2>
        <div className="relative h-[600px] w-full max-w-[600px] bg-muted/30 rounded-lg p-4">
          <SimpleGlobe />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">You should see a rotating 3D globe above. Check console (F12) for errors!</p>
      </div>

      {/* Test AnimatedTestimonials */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. AnimatedTestimonials Component:</h2>
        <div className="bg-muted/30 rounded-lg p-4">
          <AnimatedTestimonials testimonials={testimonials} autoplay />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">You should see animated testimonials with navigation buttons</p>
      </div>
    </div>
  )
}
