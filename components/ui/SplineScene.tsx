'use client'

import { useRef, useEffect, useState } from 'react'
import { Application } from '@splinetool/runtime'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className = '' }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let splineApp: Application | null = null

    const loadScene = async () => {
      if (canvasRef.current) {
        try {
          splineApp = new Application(canvasRef.current)
          await splineApp.load(scene)
          setLoading(false)
        } catch (err) {
          console.error('Error loading Spline scene:', err)
          setError('Failed to load 3D scene')
          setLoading(false)
        }
      }
    }

    loadScene()

    return () => {
      splineApp = null
    }
  }, [scene])

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />
}

// Add keyframe animation for loader
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    .loader {
      width: 48px;
      height: 48px;
      border: 5px solid #FFF;
      border-bottom-color: transparent;
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
  `
  document.head.appendChild(style)
}
