'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageCircle, ArrowRight, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { label: 'Tentang Ika', href: '#kenalan-dengan-ika' },
    { label: 'Tantangan 7 Hari', href: '#tantangan' },
    { label: 'Testimoni', href: '#testimoni' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <footer className="bg-warm-sand border-t border-warm-border" role="contentinfo">
      <div className="container-custom py-16 lg:py-20">
        {/* Closing Section — Body 4 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="section-label inline-block mb-4">MULAI SEKARANG</span>
          <h2 className="heading-2 mb-6">Perubahan Tidak Terjadi Dalam Semalam</h2>
          <p className="body-lg text-soft-black/90 mb-6">
            Setiap perjalanan besar selalu dimulai dari satu langkah kecil.
          </p>
          <p className="body-base text-soft-black/90 mb-8 max-w-2xl mx-auto">
            Jika hari ini kamu merasa ingin berubah menjadi lebih sehat, lebih percaya diri, dan mau membangun masa depan yang lebih baik untuk keluarga, kami dengan senang hati akan menemanimu.
          </p>
          <a
            href="https://api.whatsapp.com/send/?phone=6285312000796&text=Halo%20Ika%2C%20saya%20mau%20mulai%207%20Hari%20Growth%20Challenge"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 group"
            aria-label="Mulai 7 Hari untuk berubah via WhatsApp"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            <span>Mulai 7 Hari untuk berubah</span>
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-1"
          >
            <Link href="/" className="inline-block mb-6" aria-label="Komunitas Tumbuh Bersama - Home">
              <span className="font-heading text-2xl sm:text-3xl font-medium text-sage-green-dark tracking-tight">
                Komunitas Tumbuh Bersama
              </span>
            </Link>
            <p className="body-base text-soft-black/90 mb-6 max-w-xs">
              Growth First, Business Later. Membantu ibu & keluarga bertumbuh dalam kepemimpinan, kesehatan, dan kesejahteraan.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/growwithika"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-warm-border flex items-center justify-center text-sage-green hover:bg-sage-green hover:text-white transition-all duration-300"
                aria-label="Instagram Komunitas Tumbuh Bersama"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://youtube.com/@growwithika"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-warm-border flex items-center justify-center text-sage-green hover:bg-sage-green hover:text-white transition-all duration-300"
                aria-label="YouTube Komunitas Tumbuh Bersama"
              >
                <Youtube className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://tiktok.com/@growwithika"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-warm-border flex items-center justify-center text-sage-green hover:bg-sage-green hover:text-white transition-all duration-300"
                aria-label="TikTok Komunitas Tumbuh Bersama"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            aria-label="Navigasi footer"
          >
            <h3 className="heading-4 mb-4">Navigasi</h3>
            <ul className="space-y-3" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="body-base text-soft-black/90 hover:text-sage-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="space-y-4"
          >
            <h3 className="heading-4 mb-4">Tagline</h3>
            <div className="space-y-2 text-center">
              <p className="body-lg font-medium text-sage-green-dark">
                Growth First, Business Later
              </p>
              <p className="body-base text-soft-black/90 italic">
                Tambah Umur, Tambah Keren
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <h3 className="heading-4 mb-4">Mulai Bertumbuh</h3>
            <div className="flex flex-col sm:flex-row gap-3">
            <Link href="#tantangan" className="btn-primary w-full sm:w-auto text-center group">
                <span>Mulai 7 Hari untuk berubah</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a
                href="https://api.whatsapp.com/send/?phone=6285312000796&text=Halo%20Admin%2C%20saya%20tertarik%20dengan%207%20Hari%20Memulai%20Perubahan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto text-center group"
                aria-label="Chat langsung dengan Ika via WhatsApp"
              >
                <span>Chat Ika</span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="mt-12 lg:mt-20 pt-8 lg:pt-12 border-t border-warm-border"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-text-muted">
            <p className="text-center lg:text-left">
              <p className="text-center lg:text-left">© {new Date().getFullYear()} Komunitas Tumbuh Bersama. Growth First, Business Later.</p>
            </p>
            <div className="flex items-center gap-4 text-center lg:text-right">
              <Link
                href="/privacy"
                className="hover:text-sage-green transition-colors"
              >
                Kebijakan Privasi
              </Link>
              <span aria-hidden="true">•</span>
              <Link
                href="/terms"
                className="hover:text-sage-green transition-colors"
              >
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
