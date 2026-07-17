'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageCircle, CheckCircle2 } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-warm-sand">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-sand via-warm-sand to-sage-green/20" aria-hidden="true" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-sage-green/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative container-custom px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-10"
          >
            <Link href="/" className="inline-block" aria-label="GrowWithIka - Home">
              <span className="font-heading text-3xl sm:text-4xl font-medium text-sage-green-dark tracking-tight">
                GrowWithIka
              </span>
            </Link>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="heading-1 text-balance mb-6"
          >
            Dari Ibu Rumah Tangga jadi Leader Mandiri — Tanpa Tekanan Jualan
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="body-lg text-soft-black/90 max-w-3xl mx-auto mb-10 text-balance"
          >
            Sistem 3 Level: Growth → Leadership → Business. Mulai dari 7 Hari Gratis via WhatsApp, zero pressure. Atomy opsional di Level 3.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="#challenge-form"
              className="btn-primary group"
              aria-label="Gabung 7 Hari Growth Challenge gratis via WhatsApp"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              <span>Gabung 7 Hari Growth Challenge</span>
              <motion.div
                initial={{ x: -4 }}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="flex items-center"
                aria-hidden="true"
              >
                →
              </motion.div>
            </Link>

            <Link
              href="#kenalan-dengan-ika"
              className="btn-secondary"
              aria-label="Kenalan dengan Ika Irawati via WhatsApp"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Kenalan dengan Ika
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm"
            role="list"
            aria-label="Kepercayaan dan sertifikasi"
          >
            <span className="badge badge-sage" role="listitem">
              <CheckCircle2 className="w-3 h-3 mr-1.5" aria-hidden="true" />
              Atomy Business Leader
            </span>
            <span className="badge badge-sage" role="listitem">
              <CheckCircle2 className="w-3 h-3 mr-1.5" aria-hidden="true" />
              Maxwell Leadership Certified
            </span>
            <span className="badge badge-sage" role="listitem">
              <CheckCircle2 className="w-3 h-3 mr-1.5" aria-hidden="true" />
              Founder GrowWithIka
            </span>
            <span className="badge badge-terracotta" role="listitem">
              Growth First, Business Later
            </span>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
          className="mt-16 relative"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-warm-lg bg-warm-border relative">
              <Image
                src="/ika-hero.jpg"
                alt="Ika Irawati — Growth & Leadership Mentor"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-warm-sand/60 via-transparent to-sage-green/20" aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
        aria-hidden="true"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
