'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'

interface ContainerScrollProps {
  titleComponent: ReactNode
  children: ReactNode
}

export function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState(20)
  const [scale, setScale] = useState(1.05)
  const [translate, setTranslate] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const scrollProgress = Math.max(0, Math.min(1, -rect.top / 1000))

            // Update rotate: 20 -> 0
            setRotate(20 - scrollProgress * 20)

            // Update scale: 1.05 -> 1 (or 0.7 -> 0.9 on mobile)
            if (isMobile) {
              setScale(0.7 + scrollProgress * 0.2)
            } else {
              setScale(1.05 - scrollProgress * 0.05)
            }

            // Update translate: 0 -> -100
            setTranslate(-scrollProgress * 100)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <div
      ref={containerRef}
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: '1000px' }}>
        {/* Header with title */}
        <div
          style={{
            transform: `translateY(${translate}px)`,
            willChange: 'transform'
          }}
          className="div max-w-5xl mx-auto text-center"
        >
          {titleComponent}
        </div>

        {/* Card with content */}
        <div
          style={{
            transform: `rotateX(${rotate}deg) scale(${scale})`,
            willChange: 'transform',
            boxShadow:
              '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
          }}
          className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-nature-700 p-2 md:p-6 bg-nature-900 rounded-[30px] shadow-2xl"
        >
          <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
