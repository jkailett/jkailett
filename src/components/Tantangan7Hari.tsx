'use client'

import { motion } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { useState } from 'react'

const topics = [
  { day: '01', title: 'Bangun Mentalitas Bertumbuh', icon: '🧠' },
  { day: '02', title: 'Temukan Tujuan Hidupmu', icon: '🎯' },
  { day: '03', title: 'Bangun Rutin Pagi yang Memberdayakan', icon: '🌅' },
  { day: '04', title: 'Komunikasi yang Menghubungkan', icon: '💬' },
  { day: '05', title: 'Kelola Keuangan dengan Bijak', icon: '💰' },
  { day: '06', title: 'Jelajah Kepemimpinan Diri', icon: '👑' },
  { day: '07', title: 'Rencana Aksi Nyata', icon: '📋' },
}

const faqs = [
  {
    q: 'Apakah ini MLM atau bisnis piramida?',
    a: 'Ini komunitas growth & leadership. Atomy hanya vehicle opsional, bukan wajib. Tidak ada paksaan rekrut orang atau beli produk.',
  },
  {
    q: 'Butuh modal berapa untuk mulai?',
    a: 'Tantangan 7 Hari Bertumbuh: GRATIS 100%. Program lanjutan: investasi sesuai kemampuan dan kebutuhan.',
  },
  {
    q: 'Kapan sertifikat John Maxwell resmi dirilis?',
    a: 'Sedang dalam proses sertifikasi resmi, akan diumumkan melalui komunitas.',
  },
  {
    q: 'Butuh banyak waktu nggak?',
    a: 'Cukup 15-30 menit/hari. Fleksibel untuk ibu sibuk.',
  },
  {
    q: 'Saya gaptek banget, bisa ikut?',
    a: 'Bisa! Cukup bisa pakai WhatsApp. Kami panduan step-by-step.',
  },
  {
    q: 'Harus jualan Atomy nggak?',
    a: 'Tidak wajib. Atomy hanya vehicle income opsional di Level 3. Tidak ada paksaan.',
  },
]

export default function Tantangan7Hari() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section
      id="tantangan"
      className="section-padding bg-warm-sand"
      aria-labelledby="tantangan-heading"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="section-label">TANTANGAN 7 HARI BERTUMBUH</span>
          
          <motion.h2
            id="tantangan-heading"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16"
        >
          {topics.map((topic, index) => (
            <motion.article
              key={topic.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.08, ease: 'easeOut' }}
              className="group relative p-6 bg-white rounded-2xl border border-warm-border shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <span className="absolute -top-3 left-6 bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full">
                {topic.day}
              </span>
              <div className="text-4xl mb-3">{topic.icon}</div>
              <h3 className="heading-4 group-hover:text-terracotta transition-colors">
                {topic.title}
              </h3>
            </motion.article>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="bg-soft-khaki rounded-3xl p-8 lg:p-12">
            <span className="section-label">DAFTAR GRATIS</span>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-3 mb-2"
            >
              Kirim WA, mulai hari ini.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-base text-soft-black/70 mb-8"
            >
              Isi nama & nomor WA, langsung dapatkan materi hari 1.
            </motion.p>

            <form className="space-y-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">Nama Panggilan Bunda</div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Contoh: Bunda Sari"
                    className="input-field w-full"
                    required
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Nomor WhatsApp</div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="08xx-xxxx-xxxx"
                    className="input-field w-full"
                    required
                    autoComplete="tel"
                    pattern="08[0-9]{8,11}"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full group"
                  aria-label="Gabung 7 Hari Growth Challenge via WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Gabung 7 Hari Growth Challenge</span>
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </button>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xs text-text-muted text-center"
                >
                  Dengan mendaftar, kamu setuju menerima broadcast WA
                </motion.p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}