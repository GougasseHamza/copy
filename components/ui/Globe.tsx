'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import createGlobe, { type COBEOptions } from 'cobe'
import { cn } from '@/lib/utils'

interface GlobeProps {
  className?: string
  config?: COBEOptions
}

export function Globe({ className = '', config }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)
  const phiRef = useRef(0)

  const mergedConfig = useMemo<COBEOptions>(() => ({
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
    ...config,
  }), [config])

  useEffect(() => {
    let width = 0
    let globe: any = null

    const onRender = (state: Record<string, any>) => {
      if (!pointerInteracting.current) phiRef.current += 0.005
      state.phi = phiRef.current + r
      state.width = width * 2
      state.height = width * 2
    }

    const onResize = () => {
      if (containerRef.current) {
        width = containerRef.current.offsetWidth
        console.log('Globe: Container width =', width)
      }
    }

    const initGlobe = () => {
      window.addEventListener('resize', onResize)
      onResize()

      if (canvasRef.current && width > 0) {
        console.log('Globe: Creating globe with width', width * 2)
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
        }, 100)
      } else {
        console.warn('Globe: Canvas not ready or width is 0', {
          hasCanvas: !!canvasRef.current,
          hasContainer: !!containerRef.current,
          width
        })
      }
    }

    // Use requestAnimationFrame to ensure layout has completed
    requestAnimationFrame(() => {
      initGlobe()
    })

    const handlePointerDown = (e: PointerEvent) => {
      pointerInteracting.current = e.clientX - pointerInteractionMovement.current
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grabbing'
      }
    }

    const handlePointerUp = () => {
      pointerInteracting.current = null
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grab'
      }
    }

    const handlePointerOut = () => {
      pointerInteracting.current = null
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grab'
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current
        pointerInteractionMovement.current = delta
        setR(delta / 200)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0] && pointerInteracting.current !== null) {
        const delta = e.touches[0].clientX - pointerInteracting.current
        pointerInteractionMovement.current = delta
        setR(delta / 200)
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
  }, [mergedConfig, r])

  return (
    <div ref={containerRef} className={cn('absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]', className)}>
      <canvas
        ref={canvasRef}
        className={cn('size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]')}
        style={{ cursor: 'grab' }}
      />
    </div>
  )
}
