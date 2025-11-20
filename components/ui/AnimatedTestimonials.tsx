'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Testimonial {
  quote: string
  name: string
  designation: string
  src: string
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[]
  autoplay?: boolean
  className?: string
}

const IconArrowLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="h-5 w-5 text-foreground group-hover/button:rotate-12 transition-transform duration-300"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </svg>
)

const IconArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="h-5 w-5 text-foreground group-hover/button:-rotate-12 transition-transform duration-300"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
    />
  </svg>
)

export function AnimatedTestimonials({
  testimonials,
  autoplay = false,
  className = '',
}: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0)

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10
  }

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000)
      return () => clearInterval(interval)
    }
  }, [autoplay, handleNext])

  return (
    <div className={cn('max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20', className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Images */}
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence mode="wait">
              {testimonials.map(
                (testimonial, index) =>
                  index === active && (
                    <motion.div
                      key={testimonial.src}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        rotateY: randomRotateY(),
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotateY: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        rotateY: randomRotateY(),
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className="absolute inset-0 origin-bottom"
                      style={{
                        zIndex: index === active ? 999 : testimonials.length + 2 - index,
                      }}
                    >
                      <img
                        src={testimonial.src}
                        alt={testimonial.name}
                        draggable={false}
                        className="h-full w-full rounded-3xl object-cover object-center"
                      />
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Content */}
        <div className="flex justify-between flex-col py-4">
          <div>
            <AnimatePresence mode="wait">
              {testimonials[active] && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-foreground">
                    {testimonials[active].name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[active].designation}
                  </p>
                  <p className="text-lg text-muted-foreground mt-8">
                    {testimonials[active].quote.split(' ').map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                        animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: 0.02 * index,
                        }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button hover:bg-secondary/80 transition-colors"
            >
              <IconArrowLeft />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button hover:bg-secondary/80 transition-colors"
            >
              <IconArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
