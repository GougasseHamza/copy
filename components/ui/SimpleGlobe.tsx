'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

export function SimpleGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    console.log('SimpleGlobe: Component mounted')
    let phi = 0
    let globe: any = null

    if (!canvasRef.current) {
      console.error('SimpleGlobe: Canvas ref is null')
      return
    }

    console.log('SimpleGlobe: Creating globe...')

    try {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 600,
        height: 600,
        phi: 0,
        theta: 0.3,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.2, 0.5, 0.3],        // Nature green base
        markerColor: [0.1, 0.8, 0.5],      // Vibrant green markers
        glowColor: [0.3, 0.8, 0.5],        // Green glow
        markers: [
          // Morocco locations
          { location: [33.9716, -6.8498], size: 0.08 },   // Rabat
          { location: [33.5731, -7.5898], size: 0.1 },    // Casablanca
          { location: [31.6295, -7.9811], size: 0.08 },   // Marrakech
          { location: [34.0209, -6.8416], size: 0.06 },   // Fes
          // Other major cities
          { location: [48.8566, 2.3522], size: 0.05 },    // Paris
          { location: [51.5074, -0.1278], size: 0.05 },   // London
          { location: [40.7128, -74.0060], size: 0.05 },  // New York
        ],
        onRender: (state) => {
          state.phi = phi
          phi += 0.005  // Slower rotation
        },
      })
      console.log('SimpleGlobe: Globe created successfully!', globe)
    } catch (error) {
      console.error('SimpleGlobe: Error creating globe:', error)
    }

    return () => {
      console.log('SimpleGlobe: Cleaning up...')
      if (globe) {
        globe.destroy()
      }
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: '1' }}
      />
    </div>
  )
}
