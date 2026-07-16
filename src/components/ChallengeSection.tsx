'use client'

import { motion } from 'framer-motion'
import ChallengeForm from './ChallengeForm'
import { Target, Compass, Sunrise, MessageSquare, Wallet, Crown } from 'lucide-react'

const topics = [
  { number: '01', icon: Target, title: 'Bangun Mentalitas Bertumbuh' },
  { number: '02', icon: Compass, title: 'Temukan Tujuan Hidupmu' },
  { number: '03', icon: Sunrise, title: 'Bangun Rutin Pagi yang Memberdayakan' },
  { number: '04', icon: MessageSquare, title: 'Komunikasi yang Menghubungkan' },
  { number: '05', icon: Wallet, title: 'Kelola Keuangan dengan Bijak' },
  { number: '06', icon: Crown, title: 'Jelajah Kepemimpinan Diri' },
  { number: '07', icon: Target, title: 'Rencana Aksi Nyata' },
]

export default function ChallengeSection() {
  return (
    <section
      id="tantangan"
      className="section-padding bg-warm-sand"
      aria-labelledby="challenge-heading"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label">TANTANGAN</span>

          <motion.h2
            id="challenge-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-2 mb-4"
          >
            Tantangan 7 Hari Bertumbuh — Gratis 100%
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg text-soft-black/70"
          >
            Kirim satu pesan WhatsApp — dapatkan pelajaran harian selama 7 hari. Tanpa kartu kredit, tanpa jualan, tanpa spam. Hanya langkah kecil setiap hari.
          </motion.p>
        </motion.div>

        {/* 7 Topics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16"
        >
          {topics.map((topic, index) => (
            <motion.article
              key={topic.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.08, ease: 'easeOut' }}
              className="group relative p-5 sm:p-6 bg-white rounded-2xl border border-warm-border shadow-warm hover:shadow-warm-lg hover:border-sage-green/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 300 }}
                  className="flex-shrink-0 w-12 h-12 rounded-xl bg-warm-sand/50 flex items-center justify-center group-hover:bg-terracotta/10 group-hover:text-terracotta transition-all duration-300"
                >
                  <topic.icon className="w-6 h-6 text-terracotta" aria-hidden="true" />
                </motion.div>
                <div>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-2xl font-bold text-terracotta font-heading"
                  >
                    {topic.number}
                  </motion.span>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="heading-4"
                  >
                    {topic.title}
                  </motion.h3>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <ChallengeForm />
        </motion.div>
      </div>
    </section>
  )
}
