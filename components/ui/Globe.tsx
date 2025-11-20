'use client'

import { useRef, useEffect, useState } from 'react'
import createGlobe, { type COBEOptions } from 'cobe'
import { cn } from '@/lib/utils'

interface GlobeProps {
  className?: string
  config?: COBEOptions
}

export function Globe({ className = '', config }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)

  const defaultConfig: COBEOptions = {
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
    baseColor: [1, 1, 1],
    markerColor: [251 / 255, 100 / 255, 21 / 255],
    glowColor: [1, 1, 1],
    markers: [
      { location: [14.5995, 120.9842], size: 0.03 },
      { location: [19.076, 72.8777], size: 0.1 },
      { location: [23.8103, 90.4125], size: 0.05 },
      { location: [30.0444, 31.2357], size: 0.07 },
      { location: [39.9042, 116.4074], size: 0.08 },
      { location: [-23.5505, -46.6333], size: 0.1 },
      { location: [19.4326, -99.1332], size: 0.1 },
      { location: [40.7128, -74.006], size: 0.1 },
      { location: [34.6937, 135.5022], size: 0.05 },
      { location: [41.0082, 28.9784], size: 0.06 },
    ],
  }

  const mergedConfig = { ...defaultConfig, ...config }

  useEffect(() => {
    let phi = 0
    let width = 0
    let globe: any = null

    const updatePointerInteraction = (value: number | null) => {
      pointerInteracting.current = value
      if (canvasRef.current) {
        canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab'
      }
    }

    const updateMovement = (clientX: number) => {
      if (pointerInteracting.current !== null) {
        const delta = clientX - pointerInteracting.current
        pointerInteractionMovement.current = delta
        setR(delta / 200)
      }
    }

    const onRender = (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005
      state.phi = phi + r
      state.width = width * 2
      state.height = width * 2
    }

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener('resize', onResize)
    onResize()

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        ...mergedConfig,
        width: width * 2,
        height: width * 2,
        onRender,
      })

      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = '1'
        }
      }, 0)
    }

    const handlePointerDown = (e: PointerEvent) => {
      updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
    }

    const handlePointerUp = () => {
      updatePointerInteraction(null)
    }

    const handlePointerOut = () => {
      updatePointerInteraction(null)
    }

    const handleMouseMove = (e: MouseEvent) => {
      updateMovement(e.clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        updateMovement(e.touches[0].clientX)
      }
    }

    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener('pointerdown', handlePointerDown)
      canvas.addEventListener('pointerup', handlePointerUp)
      canvas.addEventListener('pointerout', handlePointerOut)
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('touchmove', handleTouchMove)
    }

    return () => {
      window.removeEventListener('resize', onResize)
      if (canvas) {
        canvas.removeEventListener('pointerdown', handlePointerDown)
        canvas.removeEventListener('pointerup', handlePointerUp)
        canvas.removeEventListener('pointerout', handlePointerOut)
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('touchmove', handleTouchMove)
      }
      if (globe) {
        globe.destroy()
      }
    }
  }, [r, mergedConfig])

  return (
    <div className={cn('absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]', className)}>
      <canvas
        ref={canvasRef}
        className={cn('size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]')}
      />
    </div>
  )
}
