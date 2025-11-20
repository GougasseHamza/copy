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
        theta: 0,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        markers: [
          { location: [37.7595, -122.4367], size: 0.03 },
          { location: [40.7128, -74.006], size: 0.1 },
        ],
        onRender: (state) => {
          state.phi = phi
          phi += 0.01
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
