'use client'

import { useState, useEffect, CSSProperties } from 'react'

interface NavItem {
  label: string
  id: string
}

const navItems: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'Problem', id: 'problem' },
  { label: 'Solution', id: 'solution' },
  { label: 'Contact', id: 'contact' },
]

export function NavigationPill() {
  const [activeSection, setActiveSection] = useState('home')
  const [expanded, setExpanded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pillWidth, setPillWidth] = useState(140)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    let hoverTimeout: ReturnType<typeof setTimeout>

    if (hovering) {
      setExpanded(true)
      setPillWidth(580)
    } else {
      hoverTimeout = setTimeout(() => {
        setExpanded(false)
        setPillWidth(140)
      }, 600)
    }

    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout)
    }
  }, [hovering])

  const handleSectionClick = (sectionId: string) => {
    setIsTransitioning(true)
    setActiveSection(sectionId)
    setHovering(false)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 400)
  }

  const navStyle: CSSProperties = {
    width: `${pillWidth}px`,
    height: '56px',
    background: `linear-gradient(135deg,
      #fcfcfd 0%, #f8f8fa 15%, #f3f4f6 30%, #eeeff2 45%,
      #e9eaed 60%, #e4e5e8 75%, #dee0e3 90%, #e2e3e6 100%)`,
    boxShadow: expanded
      ? `0 2px 4px rgba(0, 0, 0, 0.08), 0 6px 12px rgba(0, 0, 0, 0.12),
         0 12px 24px rgba(0, 0, 0, 0.14), 0 24px 48px rgba(0, 0, 0, 0.10),
         inset 0 2px 2px rgba(255, 255, 255, 0.8),
         inset 0 -3px 8px rgba(0, 0, 0, 0.12)`
      : `0 3px 6px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.10),
         0 16px 32px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.12),
         inset 0 2px 1px rgba(255, 255, 255, 0.7),
         inset 0 -2px 6px rgba(0, 0, 0, 0.10)`,
    overflow: 'hidden',
    transition: 'all 0.3s ease-out',
  }

  const getButtonStyle = (isActive: boolean): CSSProperties => ({
    fontSize: isActive ? '15.5px' : '15px',
    fontWeight: isActive ? 680 : 510,
    color: isActive ? '#1a1a1a' : '#656565',
    textDecoration: 'none',
    letterSpacing: '0.45px',
    background: 'transparent',
    border: 'none',
    padding: '10px 16px',
    whiteSpace: 'nowrap',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    transform: isActive ? 'translateY(-1.5px)' : 'translateY(0)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textShadow: isActive
      ? '0 1px 0 rgba(0, 0, 0, 0.35), 0 -1px 0 rgba(255, 255, 255, 0.8)'
      : '0 1px 0 rgba(0, 0, 0, 0.22), 0 -1px 0 rgba(255, 255, 255, 0.65)',
  })

  return (
    <nav
      className="relative rounded-full"
      style={navStyle}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Light effects */}
      <div
        className="absolute inset-x-0 top-0 rounded-t-full pointer-events-none"
        style={{
          height: '2px',
          background:
            'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 5%, rgba(255, 255, 255, 1) 15%, rgba(255, 255, 255, 1) 85%, rgba(255, 255, 255, 0.95) 95%, rgba(255, 255, 255, 0) 100%)',
          filter: 'blur(0.3px)',
        }}
      />

      <div
        className="absolute inset-x-0 top-0 rounded-full pointer-events-none"
        style={{
          height: '55%',
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.10) 60%, rgba(255, 255, 255, 0) 100%)',
        }}
      />

      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.20) 20%, rgba(255, 255, 255, 0.08) 40%, rgba(255, 255, 255, 0) 65%)',
        }}
      />

      {/* Navigation items container */}
      <div
        className="relative z-10 h-full flex items-center justify-center px-6"
        style={{
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, SF Pro, sans-serif',
        }}
      >
        {/* Collapsed state */}
        {!expanded && (
          <div className="flex items-center relative">
            <span
              style={{
                fontSize: '15.5px',
                fontWeight: 680,
                color: '#1a1a1a',
                letterSpacing: '0.45px',
                whiteSpace: 'nowrap',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif',
                WebkitFontSmoothing: 'antialiased',
                textShadow:
                  '0 1px 0 rgba(0, 0, 0, 0.35), 0 -1px 0 rgba(255, 255, 255, 0.8), 1px 1px 0 rgba(0, 0, 0, 0.18), -1px 1px 0 rgba(0, 0, 0, 0.15)',
              }}
            >
              {navItems.find((item) => item.id === activeSection)?.label}
            </span>
          </div>
        )}

        {/* Expanded state */}
        {expanded && (
          <div className="flex items-center justify-evenly w-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className="outline-none"
                style={getButtonStyle(item.id === activeSection)}
                onMouseEnter={(e) => {
                  if (item.id !== activeSection) {
                    e.currentTarget.style.color = '#3a3a3a'
                    e.currentTarget.style.transform = 'translateY(-0.5px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (item.id !== activeSection) {
                    e.currentTarget.style.color = '#656565'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
