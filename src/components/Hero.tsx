'use client'

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
            <Link href="/" className="inline-block" aria-label="Grow With Ika - Home">
              <span className="font-heading text-3xl sm:text-4xl font-medium text-sage-green-dark tracking-tight">
                Grow With Ika
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
            Bangun Masa Depan yang Lebih Baik.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="body-lg text-soft-black/90 max-w-3xl mx-auto mb-10 text-balance"
          >
            Saya membantu ibu dan keluarga bertumbuh dalam kepemimpinan, hidup lebih sehat, dan membangun kesejahteraan melalui komunitas, Maxwell Leadership, dan bisnis Atomy yang berorientasi jangka panjang.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full sm:w-auto"
          >
            <Link
              href="#tantangan"
              className="btn-primary group w-full sm:w-auto text-center"
              aria-label="Gabung 7 Hari bertumbuh gratis via WhatsApp"
            >
              <MessageCircle className="w-5 h-5 inline-block mr-2" aria-hidden="true" />
              <span>Gabung 7 Hari bertumbuh</span>
              <motion.div
                initial={{ x: -4 }}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="inline-flex items-center ml-2"
                aria-hidden="true"
              >
                →
              </motion.div>
            </Link>

            <Link
              href="https://api.whatsapp.com/send/?phone=6285312000796&text=Halo%20Ika%2C%20saya%20mau%20ngobrol%20tentang%20program%20bertumbuh"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost w-full sm:w-auto text-center group"
              aria-label="Ngobrol dengan Ika via WhatsApp"
            >
              <MessageCircle className="w-5 h-5 inline-block mr-2" aria-hidden="true" />
              Ngobrol dengan Ika
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
              Komunitas Tumbuh Bersama
            </span>
            <span className="badge badge-terracotta" role="listitem">
              Growth First, Business Later
            </span>
          </motion.div>
        </div>

        {/* Hero Image — foto Ika profesional, white blazer dengan navy trim */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
          className="mt-16 relative"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-warm-lg bg-warm-border relative">
              <img
                alt="Ika Irawati — Growth & Leadership Mentor"
                fetchPriority="high"
                decoding="async"
                data-nimg="fill"
                className="object-cover object-top"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
                src="/ika-hero.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-sand/60 via-transparent to-sage-green/20" aria-hidden="true" />
            </div>
            <p className="text-center text-sm text-text-muted mt-3 italic">
              Bersama David Tjokroraharjo, Presiden Maxwell Leadership Indonesia
            </p>
          </div>
        </motion.div>

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
    </div>
    </section>
  )
}
