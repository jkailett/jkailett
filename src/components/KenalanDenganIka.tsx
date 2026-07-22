'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, CheckCircle2, Target, Heart, Users, TrendingUp } from 'lucide-react'

const pillars = [
  { icon: Target, title: 'Bangun Diri, Karakter & Pola Pikir', desc: 'Growth mindset, leadership diri, percaya diri sebagai ibu' },
  { icon: Heart, title: 'Tubuh yang Lebih Sehat', desc: 'Gaya hidup sehat, produk konsumsi harian berkualitas' },
  { icon: Users, title: 'Bertumbuh dalam Komunitas', desc: 'Saling mendukung, peer growth, bukan jalan sendiri' },
  { icon: TrendingUp, title: 'Kesejahteraan Berkelanjutan', desc: 'Bisnis Atomy yang bisa diwariskan, tanpa tekanan jualan' },
]

export default function KenalanDenganIka() {
  return (
    <section
      id="kenalan-dengan-ika"
      className="section-padding bg-white"
      aria-labelledby="kenalan-heading"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center"
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="mb-10 lg:mb-0"
          >
            <div className="aspect-[4/5] max-w-md lg:max-w-lg mx-auto rounded-3xl overflow-hidden shadow-warm-lg bg-warm-border relative">
              <Image
                src="/ika-hero.jpg"
                alt="Ika Irawati — Growth & Leadership Mentor"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-sand/60 via-transparent to-sage-green/20" aria-hidden="true" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <span className="section-label inline-block mb-4">PERKENALAN</span>

            <motion.h2
              id="kenalan-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-2 mb-4"
            >
              Halo, saya Ika Irawati.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-lg text-soft-black/90 mb-4"
            >
              Saya adalah bagian dari <strong>Maxwell Leadership Certified Team</strong> dan juga membangun bisnis bersama <strong>Atomy Indonesia</strong>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="body-base text-soft-black/90 mb-4"
            >
              Saya percaya setiap orang memiliki potensi untuk bertumbuh.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="body-base text-soft-black/90 mb-6"
            >
              Saya sendiri pernah mengalami masa-masa tidak percaya diri, takut memulai, dan merasa bingung menentukan arah. Tapi semua itu yang membawa saya belajar tentang kepemimpinan, kesehatan, dan membangun masa depan melalui komunitas.
            </motion.p>

            {/* Visi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/70 rounded-2xl border border-warm-border p-6 mb-6"
            >
              <p className="heading-4 text-sage-green-dark mb-2">Mengapa Grow With Ika?</p>
              <p className="body-base text-soft-black/80 font-medium italic mb-2">
                &ldquo;Bertumbuh Dulu. Hasil Akan Mengikuti.&rdquo;
              </p>
              <p className="body-small text-soft-black/90">
                Kami percaya bahwa keberhasilan bukan hanya tentang penghasilan. Keberhasilan dimulai ketika seseorang bertumbuh sebagai pribadi.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 4 Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-16"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-3 text-center mb-10"
          >
            Membantu Lebih Banyak Keluarga Memiliki
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                className="group p-6 bg-white rounded-2xl border border-warm-border shadow-warm hover:shadow-warm-lg transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-sage-green/10 flex items-center justify-center text-sage-green mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <pillar.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h4 className="heading-4 mb-2 text-sage-green-dark">{pillar.title}</h4>
                <p className="body-small text-soft-black/90">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tantangan 7 Hari + Why Maxwell & Atomy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Tantangan 7 Hari */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-soft-khaki rounded-3xl p-8 lg:p-10"
          >
            <h3 className="heading-3 mb-4">Mulai dari Tantangan 7 Hari</h3>
            <p className="body-base text-soft-black/90 mb-4">
              Selama 7 hari, kamu akan mendapatkan pendampingan melalui WhatsApp harian. Materinya sederhana yang membantumu mulai bertumbuh.
            </p>
            <p className="body-base text-soft-black/80 font-medium italic mb-6">
              &ldquo;Yang dibangun adalah manusia terlebih dahulu, karena ketika seseorang itu bertumbuh, keputusan-keputusan baik akan mengikuti.&rdquo;
            </p>
            <Link
              href="#tantangan"
              className="btn-primary inline-flex group"
              aria-label="Mulai Tantangan 7 Hari gratis"
            >
              <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
              <span>Mulai 7 Hari — Gratis</span>
            </Link>
          </motion.div>

          {/* Why Maxwell & Atomy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl border border-warm-border p-8 lg:p-10"
          >
            <h3 className="heading-3 mb-4">Mengapa Maxwell Leadership & Atomy?</h3>
            <p className="body-base text-soft-black/90 mb-4">
              Karena keduanya saling melengkapi.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-soft-khaki/50 rounded-xl">
                <AwardIcon />
                <div>
                  <h4 className="font-medium text-sage-green-dark">Maxwell Leadership</h4>
                  <p className="body-small text-soft-black/90">Membantu kita bertumbuh sebagai pribadi dan pemimpin.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-soft-khaki/50 rounded-xl">
                <LeafIcon />
                <div>
                  <h4 className="font-medium text-sage-green-dark">Atomy</h4>
                  <p className="body-small text-soft-black/90">Memberikan kesempatan membangun gaya hidup sehat sekaligus peluang bisnis yang dapat diwariskan.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function AwardIcon() {
  return (
    <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center text-terracotta flex-shrink-0">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    </div>
  )
}

function LeafIcon() {
  return (
    <div className="w-10 h-10 rounded-xl bg-sage-green/10 flex items-center justify-center text-sage-green flex-shrink-0">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </div>
  )
}
