'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'Apakah ini MLM atau bisnis piramida?',
    answer: 'Ini komunitas growth & leadership. Atomy hanya vehicle opsional, bukan wajib.',
  },
  {
    question: 'Butuh modal berapa untuk mulai?',
    answer: '7 Hari Challenge: GRATIS. Program lanjutan: investasi sesuai kemampuan.',
  },
  {
    question: 'Kapan sertifikat John Maxwell resmi dirilis?',
    answer: 'Sedang dalam proses sertifikasi resmi, akan diumumkan melalui komunitas.',
  },
  {
    question: 'Butuh banyak waktu nggak?',
    answer: 'Cukup 15-30 menit/hari. Fleksibel untuk ibu sibuk.',
  },
  {
    question: 'Saya gaptek banget, bisa ikut?',
    answer: 'Bisa! Cukup bisa pakai WhatsApp. Kami panduan step-by-step.',
  },
  {
    question: 'Harus jualan Atomy nggak?',
    answer: 'Tidak wajib. Atomy hanya vehicle income opsional di Level 3.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="section-padding bg-soft-khaki"
      aria-labelledby="faq-heading"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="section-label">FAQ</span>

          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-2 mb-4"
          >
            Ada Pertanyaan?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg text-soft-black/70"
          >
            Jawaban untuk hal yang paling sering ditanyakan
          </motion.p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-warm-border overflow-hidden mb-4 shadow-warm hover:shadow-warm-lg transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-sage-green/50 focus:ring-offset-2"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-left w-full pr-10 text-sage-green-dark font-medium body-lg"
                >
                  {faq.question}
                </motion.span>

                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-warm-sand/50 flex items-center justify-center text-sage-green"
                  aria-hidden="true"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="px-6 pb-6 body-base text-soft-black/70 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
EOF