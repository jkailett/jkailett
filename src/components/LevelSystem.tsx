'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Target, BookOpen, Users, TrendingUp, Brain, Compass, Sunrise, MessageSquare, Wallet, Crown, TrendingUp as TrendingUp2, Zap, Repeat } from 'lucide-react'

const levels = [
  {
    badge: 'GRATIS',
    badgeVariant: 'terracotta' as const,
    duration: '7 HARI',
    title: 'Growth Foundation',
    description: 'Fondasi mindset, habit, & purpose yang kuat melalui Tantangan 7 Hari Bertumbuh',
    items: [
      { icon: Brain, text: 'Bangun Mentalitas Bertumbuh' },
      { icon: Compass, text: 'Temukan Tujuan Hidupmu' },
      { icon: Target, text: 'Bangun Rutin Pagi yang Memberdayakan' },
      { icon: Users, text: 'Komunikasi yang Menghubungkan' },
    ],
    cta: 'Mulai Sekarang — Gratis',
    ctaVariant: 'primary' as const,
    href: '#tantangan',
  },
  {
    badge: 'PREMIUM',
    badgeVariant: 'sage' as const,
    duration: '30 HARI',
    title: 'Leadership Mastery',
    description: 'Pelajari & terapkan 15 Hukum Kepemimpinan Maxwell dalam 30 hari',
    items: [
      { icon: Target, text: 'Hukum Proses & Hukum Prioritas' },
      { icon: Users, text: 'Hukum Tim & Hukum Pemberdayaan' },
      { icon: BookOpen, text: 'Hukum Pantulan & Hukum Warisan' },
      { icon: TrendingUp, text: 'Hukum Pertumbuhan & Hukum Navigasi' },
    ],
    cta: 'Info Program',
    ctaVariant: 'secondary' as const,
    href: '#',
  },
  {
    badge: 'OPSIONAL',
    badgeVariant: 'clay' as const,
    duration: 'VEHICLE INCOME',
    title: 'Business & Leadership',
    description: 'Dengan fondasi growth & leadership, Atomy jadi vehicle income opsional jangka panjang',
    items: [
      { icon: Zap, text: 'Sistem Atomy & Duplikasi Tim' },
      { icon: Crown, text: 'Passive Income & Legacy Building' },
      { icon: TrendingUp2, text: 'Kesejahteraan Jangka Panjang' },
      { icon: Repeat, text: 'Sistem Berkelanjutan & Berkelanjutan' },
    ],
    cta: 'Info Program Atomy',
    ctaVariant: 'clay' as const,
    href: '#',
  },
]

export default function LevelSystem() {
  return (
    <section
      id="sistem"
      className="section-padding bg-soft-khaki"
      aria-labelledby="sistem-heading"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="section-label">SISTEM</span>
          
          <motion.h2
            id="sistem-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-2 mb-4"
          >
            Tiga Level Tumbuh, Satu Jalan.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg text-soft-black/70"
          >
            Sistem sederhana yang dirancang mengantarkan Bunda dari nol ke mandiri finansial — tanpa tekanan jualan keras.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {levels.map((level, index) => (
            <motion.article
              key={level.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15, ease: 'easeOut' }}
              className="relative bg-white rounded-2xl border border-warm-border shadow-warm hover:shadow-warm-lg transition-all duration-300 overflow-hidden"
            >
              {/* Top accent bar */}
              <div 
                className={`h-1 w-full ${
                  level.badgeVariant === 'terracotta' ? 'bg-terracotta' :
                  level.badgeVariant === 'sage' ? 'bg-sage-green' : 'bg-muted-clay'
                }`} 
                aria-hidden="true"
              />
              
              <div className="p-6 lg:p-8">
                {/* Badge & Duration */}
                <div className="flex flex-col items-start gap-1 mb-6">
                  <span className={`badge ${level.badgeVariant === 'terracotta' ? 'badge-terracotta' : level.badgeVariant === 'sage' ? 'badge-sage' : 'badge-clay'}`}>
                    {level.badge}
                  </span>
                  <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                    {level.duration}
                  </span>
                </div>

                {/* Title & Description */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="heading-3 mb-3"
                >
                  {level.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="body-base text-soft-black/70 mb-8"
                >
                  {level.description}
                </motion.p>

                {/* Features */}
                <ul className="space-y-4 mb-8" role="list" aria-label={`${level.title} features`}>
                  {level.items.map((item, i) => (
                    <motion.li
                      key={item.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      className="flex items-start gap-3 text-soft-black/80"
                    >
                      <div className="w-10 h-10 rounded-lg bg-warm-sand/50 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-sage-green" aria-hidden="true" />
                      </div>
                      <span className="body-small pt-1">{item.text}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <a
                    href={level.href}
                    className={`
                      inline-flex items-center justify-center w-full gap-2
                      ${level.ctaVariant === 'primary' ? 'btn-primary' : 
                        level.ctaVariant === 'secondary' ? 'btn-secondary' : 
                        'inline-flex items-center justify-center w-full gap-2 px-8 py-4 rounded-full border-2 border-muted-clay text-muted-clay font-medium text-base hover:bg-muted-clay/10 transition-all duration-300'}
                    `}
                    aria-label={level.cta}
                  >
                    {level.cta}
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                  </a>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
EOF