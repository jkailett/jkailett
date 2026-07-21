'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const painPoints = [
  {
    text: 'Ingin berkembang tetapi tidak tahu mulai dari mana.',
  },
  {
    text: 'Ingin punya penghasilan tambahan, tetapi tidak nyaman menjual atau memaksa orang.',
  },
  {
    text: 'Ingin hidup lebih sehat, tetapi sulit konsisten.',
  },
  {
    text: 'Ingin menjadi ibu yang lebih percaya diri dan mampu memimpin keluarga.',
  },
  {
    text: 'Merasa jalan sendirian dan itu melelahkan.',
  },
]

export default function ProblemSection() {
  return (
    <section
      id="masalah"
      className="section-padding bg-soft-khaki"
      aria-labelledby="problem-heading"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="section-label">MUNGKIN SAAT INI KAMU SEDANG MERASAKAN</span>

          <motion.h2
            id="problem-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-2 mb-4"
          >
            Pernah Merasa Seperti Ini, Bunda?
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="max-w-2xl mx-auto space-y-4"
        >
          {painPoints.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
              className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-warm-border shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta text-lg font-bold">
                ✓
              </span>
              <p className="body-base text-soft-black/80 leading-relaxed pt-1">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bridge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="mt-12 max-w-2xl mx-auto text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="body-lg font-medium text-soft-black mb-4"
          >
            Kalau kamu merasakan salah satunya, maka kamu sudah berada di tempat yang tepat.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-base text-soft-black/90 mb-8"
          >
            Banyak anggota komunitas kami memulai dari titik yang sama.
          </motion.p>

          <motion.a
            href="https://api.whatsapp.com/send/?phone=6285312000796&text=Halo%20Ika%2C%20saya%20mau%20mulai%207%20Hari%20Growth%20Challenge"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex group"
            aria-label="Mulai 7 Hari bertumbuh gratis via WhatsApp"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
            <span>Mulai 7 Hari bertumbuh — Gratis</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
