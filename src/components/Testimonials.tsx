'use client'

import { motion } from 'framer-motion'
import { Users, Star, Calendar, Award, MessageCircle, Shield, TrendingUp } from 'lucide-react'

export default function Testimonials() {
  const stats = [
    { icon: Users, label: 'Ibu Aktif', value: '1.240+', desc: 'Di seluruh Indonesia' },
    { icon: Star, label: 'Rating Rata-rata', value: '4.9/5', desc: 'Dari survey kepuasan' },
    { icon: Calendar, label: 'Pengalaman', value: '5+ Tahun', desc: 'Mentoring & Coaching' },
    { icon: Award, label: 'Sertifikasi', value: 'Maxwell Certified', desc: 'Leadership Coach Resmi' },
  ]

  const snapshots = [
    { 
      quote: '"Sebelum join, saya takut MLM = ngejar orang. Ternyata Level 1-2 cuma growth. Baru Level 3 Atomy kalau mau. Sekarang punya team 15 orang, penghasilan sampingan 3-5jt/bln — tanpa meninggalkan anak."',
      name: 'Bu Siti',
      location: 'Surabaya',
      level: 'Level 3',
      result: 'Team 15, +3-5jt/bln'
    },
    { 
      quote: '"Gaptek banget saya, HP cuma buat WA & TikTok. Ternyata sistemnya lewat WA aja — nggak perlu app tambahan. Banyak member 40+ sukses. Sekarang confident banget online."',
      name: 'Bu Dewi',
      location: 'Bandung',
      level: 'Level 2',
      result: 'Lead gen 15/bln, confidence naik 80%'
    },
    { 
      quote: '"Yang beda: Ika nggak cuma kasih materi, tapi nemenin sampe bisa. Selesai 7 hari, lanjut Level 2. Rasa aman banget ada mentor yang ngerjain bareng, bukan guru-murid tapi peer growth."',
      name: 'Bu Rina',
      location: 'Medan',
      level: 'Level 1',
      result: 'Selesai 7 hari, lanjut Level 2'
    },
    { 
      quote: '"Team 40+ dalam 18 bulan. Passive income mulai. Produk konsumsi harian — ibu beli rutin. Ini bisnis yang adil: produk real, sistem fair, mentor yang nemenin."',
      name: 'Bu Maya',
      location: 'Surabaya',
      level: 'Level 3',
      result: 'Team 40+, passive income mulai'
    },
  ]

  const partners = [
    { name: 'Maxwell Leadership', desc: 'Official Certified Coach' },
    { name: 'Atomy Indonesia', desc: 'Master Distributor Partner' },
    { name: 'Komunitas Tumbuh Bersama', desc: '1.240+ Member Aktif' },
  ]

  return (
    <section
      id="testimoni"
      className="section-padding bg-warm-sand"
      aria-labelledby="testimoni-heading"
    >
      <div className="container-custom">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: 'easeOut' }}
                className="group p-6 bg-white rounded-2xl border border-warm-border shadow-warm hover:shadow-warm-lg transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-terracotta/10 flex items-center justify-center text-terracotta mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <p className="heading-2 text-terracotta font-bold mb-1">{stat.value}</p>
                <p className="body-small font-medium text-soft-black/90">{stat.label}</p>
                <p className="text-xs text-text-muted mt-1">{stat.desc}</p>
              </motion.article>
            ))}
          </div>

          {/* Partner Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm mb-16"
            role="list"
            aria-label="Trusted by official partners"
          >
            {partners.map((partner, index) => (
              <span 
                key={partner.name} 
                role="listitem"
                className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-warm-border text-soft-black/80"
              >
                <Shield className="w-4 h-4 text-sage-green" aria-hidden="true" />
                <span className="font-medium">{partner.name}</span>
                <span className="text-text-muted text-xs">{partner.desc}</span>
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Member Snapshots */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center max-w-3xl mx-auto mb-12"
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
              Sudah Dipercaya 1.240+ Ibu di Seluruh Indonesia
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-lg text-soft-black/90 max-w-2xl mx-auto"
            >
              Cerita nyata dari member komunitas — tidak difabrikasi, tidak dibayar. Hanya ibu nyata yang bertumbuh.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16"
          >
            {snapshots.map((snapshot, index) => (
              <motion.article
                key={snapshot.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                className="group p-6 bg-white rounded-2xl border border-warm-border shadow-warm hover:shadow-warm-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-sage-green/10 flex items-center justify-center text-sage-green font-bold text-lg">
                    {snapshot.level.charAt(6)}
                  </span>
                  <div>
                    <p className="font-medium text-soft-black">{snapshot.name}</p>
                    <p className="text-xs text-text-muted">{snapshot.location} · Indonesia</p>
                  </div>
                </div>
                <p className="text-sm text-soft-black/80 italic mb-4 leading-relaxed">
                  {snapshot.quote}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-warm-border">
                  <span className="badge badge-sage text-xs">{snapshot.level}</span>
                  <span className="text-xs font-medium text-terracotta">{snapshot.result}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Trust Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center max-w-2xl mx-auto p-6 bg-white/50 rounded-2xl border border-warm-border"
          >
            <MessageCircle className="w-10 h-10 mx-auto text-terracotta/50 mb-4" aria-hidden="true" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="body-base text-soft-black/80 italic text-center max-w-xl mx-auto"
            >
              "Yang beda: Ika nggak cuma kasih materi, tapi nemenin sampe bisa."
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs text-text-muted mt-2"
            >
              — Member Level 2, Surabaya
            </motion.p>
          </motion.div>
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
            className="body-base text-soft-black/90 mb-6 max-w-lg mx-auto"
          >
            Jadilah Pioneer Member. Cerita Bunda mungkin akan menjadi inspirasi ribuan ibu Indonesia lainnya.
          </motion.p>

          <a
            href="#challenge-form"
            className="btn-secondary inline-block"
            aria-label="Gabung Komunitas Pioneer (Early Bird)"
          >
            <Users className="w-5 h-5 mr-2" aria-hidden="true" />
            Gabung Komunitas Pioneer (Early Bird)
          </a>
        </motion.div>
      </div>
    </section>
  )
}