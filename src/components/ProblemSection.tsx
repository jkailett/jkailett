'use client'

import { motion } from 'framer-motion'
import { Target, Shield, Clock, Smartphone } from 'lucide-react'

const painPoints = [
  {
    icon: Target,
    title: 'Bingung Mulai',
    desc: 'Terlalu banyak info di internet. Bingung mana yang benar-benar efektif untuk ibu rumah tangga.',
  },
  {
    icon: Shield,
    title: 'Takut Jualan',
    desc: 'Takut dianggap spam ke teman. Enggan "semangat-semangat" di grup keluarga dan teman-teman lama.',
  },
  {
    icon: Clock,
    title: 'Ketinggalan Zaman',
    desc: 'Ibu muda sudah sukses jalan online. Kita masih di tempat, bingung mulai dari mana.',
  },
  {
    icon: Smartphone,
    title: 'Gaptek',
    desc: 'HP cuma buat WA & TikTok doang. Gimana mau belajar dan berkembang secara online?',
  },
]

export default function ProblemSection() {
  return (
    <section
      id="masalah"
      className="section-padding bg-warm-sand"
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
          <span className="section-label">PERMASALAHAN</span>

          <motion.h2
            id="problem-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-2 mb-4"
          >
            Pernah Merasa Begini, Bunda?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg text-soft-black/70"
          >
            Banyak ibu ingin hidup lebih sehat, lebih percaya diri, dan memiliki masa depan finansial yang lebih baik, tetapi sering bingung harus memulai dari mana.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {painPoints.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
              className="group p-6 lg:p-8 bg-white rounded-2xl border border-warm-border shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1, type: 'spring', stiffness: 300 }}
                className="w-14 h-14 rounded-xl bg-terracotta/10 flex items-center justify-center text-terracotta mb-5 group-hover:scale-110 transition-transform duration-300"
              >
                <item.icon className="w-7 h-7 text-terracotta" aria-hidden="true" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="heading-4 mb-3 group-hover:text-terracotta transition-colors"
              >
                {item.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="body-base text-soft-black/70 leading-relaxed"
              >
                {item.desc}
              </motion.p>
            </motion.article>
          ))}
        </motion.div>

        {/* Bridge to Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="body-lg text-soft-black/70 mb-8"
          >
            Di Komunitas%20Tumbuh%20Bersama, kamu akan belajar membangun kepemimpinan, kesehatan, dan bisnis secara bertahap dalam komunitas yang saling mendukung.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-base text-terracotta/90 font-medium mb-8"
          >
            ✅ 7 Hari Gratis via WhatsApp → ✅ PDF Toolkit Gratis → ✅ Komunitas 1.240+ Ibu
          </motion.p>

          <motion.a
            href="#tantangan"
            className="btn-primary inline-flex group"
            aria-label="Mulai dengan 7 Hari Growth Challenge gratis melalui WhatsApp"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Mulai 7 Hari Growth Challenge Gratis</span>
            <motion.span
              initial={{ x: -4 }}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400 }}
              aria-hidden="true"
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
