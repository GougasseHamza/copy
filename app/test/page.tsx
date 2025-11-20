'use client'

import { Card } from '@/components/ui/Card'
import { Spotlight } from '@/components/ui/Spotlight'

export default function TestPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Component Test Page</h1>

      {/* Test basic Card */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Card Component:</h2>
        <Card className="p-6 max-w-md">
          <p>If you see this in a bordered box, Card works!</p>
        </Card>
      </div>

      {/* Test Spotlight */}
      <div className="mb-8 relative h-64 bg-muted rounded-lg overflow-hidden">
        <h2 className="text-2xl font-semibold mb-4 relative z-10 p-4">Spotlight Component:</h2>
        <Spotlight className="top-0 left-0" fill="hsl(142 70% 45%)" />
        <p className="relative z-10 p-4">You should see a green glowing spotlight effect</p>
      </div>

      {/* Test basic styling */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tailwind Test:</h2>
        <div className="bg-primary text-primary-foreground p-4 rounded-lg max-w-md">
          This should be green with white text
        </div>
      </div>
    </div>
  )
}
