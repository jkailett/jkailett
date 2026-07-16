'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'

const navLinks = [
  { label: 'Program', href: '#sistem' },
  { label: 'Testimoni', href: '#testimoni' },
  { label: 'Tentang Ika', href: '#kenalan-dengan-ika' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-warm-sand/95 backdrop-blur-sm shadow-warm' : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="container-custom px-4 sm:px-6 lg:px-8" aria-label="Navigasi utama">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-2xl sm:text-3xl font-medium text-sage-green-dark hover:opacity-80 transition-opacity"
            aria-label="GrowWithIka - Home"
          >
            GrowWithIka
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="body-base text-soft-black/70 hover:text-sage-green transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="#tantangan"
              className="btn-primary px-6 py-2.5 text-sm"
              aria-label="Gabung 7 Hari Growth Challenge gratis via WhatsApp"
            >
              Gabung 7 Hari Gratis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-warm-border hover:bg-sage-green/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-soft-black" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6 text-soft-black" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-warm-sand border-t border-warm-border"
            >
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-3 text-lg text-soft-black/80 hover:text-sage-green transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-4 border-t border-warm-border space-y-3">
                  <Link
                    href="#tantangan"
                    className="btn-primary w-full text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Gabung 7 Hari Gratis
                  </Link>

                  <a
                    href="https://wa.me/628xxxxxxxxxx?text=Halo%20Ika%2C%20saya%20ingin%20kenalan%20dan%20konsultasi%20gratis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full text-center"
                    onClick={() => setIsOpen(false)}
                    aria-label="Chat langsung dengan Ika via WhatsApp"
                  >
                    Chat Ika
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
EOF