'use client'

import { motion } from 'framer-motion'

export default function Testimonials() {
  return (
    <section
      id="testimoni"
      className="section-padding bg-soft-khaki"
      aria-labelledby="testimoni-heading"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="section-label">REAL STORIES</span>

          <motion.h2
            id="testimoni-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-2 mb-4"
          >
            Testimoni Pioneer — Coming Soon
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg text-soft-black/70 max-w-2xl mx-auto"
          >
            Kami percaya pada kejujuran. Cerita nyata dari Pioneer Members akan hadir di sini setelah mereka menyelesaikan tantangan pertama mereka. Cerita di ruang ini tidak akan pernah kami fabrikasi.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16"
        >
          {[
            { id: 'P1', name: 'Pioneer #1', location: 'Bandung', status: 'Cerita Segera Hadir' },
            { id: 'P2', name: 'Pioneer #2', location: 'Surabaya', status: 'Cerita Segera Hadir' },
            { id: 'P3', name: 'Pioneer #3', location: 'Yogyakarta', status: 'Cerita Segera Hadir' },
            { id: 'P4', name: 'Pioneer #4', location: 'Jakarta', status: 'Cerita Segera Hadir' },
          ].map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
              className="group p-6 bg-white rounded-2xl border border-warm-border shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta font-bold text-lg">
                  {item.id}
                </span>
                <div>
                  <p className="font-medium text-soft-black">{item.name}</p>
                  <p className="text-xs text-text-muted">{item.location} · Indonesia</p>
                </div>
              </div>
              <p className="text-sm text-text-muted italic text-center py-4">
                {item.status}
              </p>
            </motion.article>
          ))}

        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="body-base text-soft-black/70 mb-6 max-w-lg mx-auto"
          >
            Jadilah Pioneer Member Pertama. Cerita Bunda mungkin akan menjadi inspirasi ribuan ibu Indonesia lainnya.
          </motion.p>

          <a
            href="#challenge-form"
            className="btn-secondary inline-block"
            aria-label="Gabung Komunitas Pioneer (Early Bird)"
          >
            Gabung Komunitas Pioneer (Early Bird)
          </a>
        </motion.div>
      </div>
    </section>
  )
}
EOF