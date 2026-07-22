'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Users, Heart, Shield, Sparkles } from 'lucide-react'

const stats = [
  { icon: Users, value: '1.240+', label: 'Ibu di Komunitas' },
  { icon: Heart, value: '5+ Tahun', label: 'Mentoring & Coaching' },
  { icon: Shield, value: 'Maxwell', label: 'Leadership Certified' },
  { icon: Sparkles, value: '4.9/5', label: 'Rating Kepuasan' },
]

const photos = [
  {
    src: '/komunitas-seminar.jpg',
    alt: 'Seminar Atomy Indonesia — Ika Irawati berbicara di atas panggung',
    caption: 'One Day Seminar Atomy Indonesia',
  },
  {
    src: '/komunitas-grup.jpg',
    alt: 'Foto grup besar anggota komunitas — kebersamaan wanita Indonesia',
    caption: 'Kebersamaan Komunitas Tumbuh Bersama',
  },
  {
    src: '/komunitas-duo.jpg',
    alt: 'Ika bersama member — pendampingan personal',
    caption: 'Pendampingan Leader ke Member',
  },
]

export default function CommunitySection() {
  return (
    <section className="section-padding bg-warm-white overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-sage-green mb-4">
            Komunitas Kami
          </span>
          <h2 className="heading-1 text-balance mb-6">
            Bergabung dengan <span className="text-sage-green">1.240+ Ibu Hebat</span> Indonesia
          </h2>
          <p className="body-lg text-soft-black/80 max-w-2xl mx-auto">
            Bukan sekadar grup WhatsApp. Ini komunitas ibu-ibu yang saling mendukung,
            bertumbuh bareng, dan membuktikan bahwa ibu rumah tangga bisa{' '}
            <strong>berkarya, memimpin, dan mandiri finansial</strong>.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-white rounded-2xl p-6 text-center shadow-warm border border-warm-border/50"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-green/10 text-sage-green mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-heading text-2xl md:text-3xl font-bold text-soft-black">
                  {stat.value}
                </div>
                <div className="text-sm text-soft-black/60 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Photo Grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-warm-lg">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soft-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="body-md text-soft-black/70 mb-6 max-w-xl mx-auto">
            Ribuan ibu sudah membuktikan: ketika kita bertumbuh bersama, 
            tidak ada yang tidak mungkin.{' '}
            <strong>Kamu yang berikutnya?</strong>
          </p>
          <a
            href="https://api.whatsapp.com/send/?phone=6285312000796&text=Halo%20Ika%2C%20saya%20mau%20gabung%20komunitas"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Users className="w-5 h-5" />
            Gabung Komunitas Sekarang — Gratis
          </a>
        </motion.div>
      </div>
    </section>
  )
}
