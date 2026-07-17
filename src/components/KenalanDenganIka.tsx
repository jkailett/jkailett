'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, CheckCircle2 } from 'lucide-react'

export default function KenalanDenganIka() {
  return (
    <section
      id="kenalan-dengan-ika"
      className="section-padding bg-soft-khaki"
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
                src="/ika-portrait.jpg"
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
              className="body-lg text-soft-black/70 mb-4"
            >
              Leader Atomy & Maxwell Leadership Certified Team yang membantu ribuan orang membangun hidup yang lebih sehat, bertumbuh sebagai pemimpin, dan menciptakan kesejahteraan melalui komunitas.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="body-base text-soft-black/70 mb-8"
            >
              Saya percaya setiap ibu rumah tangga menyimpan potensi luar biasa yang belum sepenuhnya digali. Bukan tentang jualan keras. Bukan tentang angka income yang muluk. Tapi tentang tumbuh dulu sebagai manusia.
            </motion.p>

            <motion.a
              href="https://wa.me/6285312200796?text=Halo%20Ren%20Coach%2C%20saya%20mau%20konsultasi%20gratis%20tentang%20GrowWithIka"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex group"
              aria-label="Chat langsung dengan Ika via WhatsApp"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              <span>Chat Langsung dengan Ika</span>
              <motion.span
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400 }}
                aria-hidden="true"
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="mt-16 pt-12 border-t border-warm-border"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto">
            <TrustBadge icon={CheckCircle2} text="Atomy Business Leader" />
            <TrustBadge icon={CheckCircle2} text="Maxwell Leadership Certified" />
            <TrustBadge icon={CheckCircle2} text="Founder GrowWithIka" />
            <TrustBadge icon={CheckCircle2} text="Ibu & Istri Bahagia" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TrustBadge({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="flex flex-col items-center text-center p-4 sm:p-6">
      <div className="w-12 h-12 rounded-xl bg-sage-green/10 flex items-center justify-center text-sage-green mx-auto mb-3">
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      <p className="body-small text-soft-black/70 font-medium">{text}</p>
    </div>
  )
}
