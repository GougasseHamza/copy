'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
          <span className="text-xl font-bold">PharmFinder</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/pharmacies" className="text-sm font-medium transition-colors hover:text-primary">
            Pharmacies
          </Link>
          <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary">
            Produits
          </Link>
          <Link href="/chatbot" className="text-sm font-medium transition-colors hover:text-primary">
            Assistant
          </Link>
          <Link href="/staff" className="text-sm font-medium transition-colors hover:text-primary">
            Personnel
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/auth/login" className="hidden md:inline-flex items-center justify-center text-sm font-medium transition-colors hover:text-primary">
            Connexion
          </Link>
          <Link href="/auth/signup" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
            S&apos;inscrire
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {!mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="space-y-1 px-4 py-3">
            <Link href="/pharmacies" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
              Pharmacies
            </Link>
            <Link href="/products" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
              Produits
            </Link>
            <Link href="/chatbot" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
              Assistant
            </Link>
            <Link href="/staff" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
              Personnel
            </Link>
            <Link href="/auth/login" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
              Connexion
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
