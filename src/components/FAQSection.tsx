'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Shield, Clock, Users, DollarSign, Smartphone, CheckCircle, XCircle, BookOpen, Target, Award, Clock as ClockIcon, MessageCircle } from 'lucide-react'

const faqs = [
  {
    question: 'Apakah ini MLM / Network Marketing?',
    answer: (
      <>
        <p className="mb-4 font-medium">Ya, transparan: Level 3 menggunakan model Atomy (Consumer Direct Marketing).</p>
        <p className="mb-4">Tapi <strong className="text-terracotta">Level 1 & 2 fokus 100% Growth & Leadership</strong> — zero selling, zero downline pressure. Anda bebas berhenti di Level 2 kalau cocok.</p>
        <p>Atomy di Level 3 hanyalah <strong>vehicle income opsional</strong> untuk yang sudah punya fondasi kuat & mau sharing produk konsumsi harian.</p>
      </>
    ),
  },
  {
    question: 'Berapa investasinya?',
    answer: (
      <>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
            <span className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center text-terracotta font-bold">1</span>
            <div>
              <p className="font-medium">Level 1 (Foundation): <span className="text-terracotta font-bold">GRATIS</span></p>
              <p className="text-sm text-soft-black/70">7 hari challenge via WA + PDF Toolkit</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
            <span className="w-10 h-10 rounded-xl bg-sage-green/10 flex items-center justify-center text-sage-green font-bold">2</span>
            <div>
              <p className="font-medium">Level 2 (Mastery): <span className="text-sage-green font-bold">Rp 499rb/bln</span></p>
              <p className="text-sm text-soft-black/70">Coaching Maxwell, akses komunitas, template konten</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
            <span className="w-10 h-10 rounded-xl bg-muted-clay/10 flex items-center justify-center text-muted-clay font-bold">3</span>
            <div>
              <p className="font-medium">Level 3 (Business): <span className="text-muted-clay font-bold">Sesuai paket Atomy</span></p>
              <p className="text-sm text-soft-black/70">Mulai konsumsi sendiri ~Rp 300rb/bln. Tidak ada paket wajib beli grosir.</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    question: 'Apakah harus rekrut orang / jadi downline?',
    answer: (
      <>
        <p className="mb-4"><strong className="text-terracotta">Tidak wajib.</strong></p>
        <p className="mb-4">Level 1-2: <strong>Self-growth only.</strong> Fokus ke mindset, habit, leadership, komunikasi.</p>
        <p className="mb-4">Level 3 (Atomy): <strong>Sharing produk konsumsi harian</strong> — bukan "rekrut downline". Banyak member hanya konsumen loyal + tambah penghasilan sampingan.</p>
        <p>Modelnya: <strong>Konsumsi sendiri dulu, sharing organik kalau cocok.</strong> Bukan model "rekrut rekrut rekrut".</p>
      </>
    ),
  },
  {
    question: 'Berapa komitmen waktu per hari?',
    answer: (
      <>
        <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
          <Clock className="w-5 h-5 text-terracotta" aria-hidden="true" />
          <div>
            <p className="font-medium">15–30 menit/hari</p>
            <p className="text-sm text-soft-black/70">Konten dikirim via WA — baca kapan nyaman</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-soft-black/70">Coaching mingguan opsional (Zoom 60 menit). Desain untuk ibu sibuk.</p>
      </>
    ),
  },
  {
    question: 'Saya gaptek teknologi, bisa ikut?',
    answer: (
      <>
        <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
          <Smartphone className="w-5 h-5 text-terracotta" aria-hidden="true" />
          <div>
            <p className="font-medium">Bisa. Semua via WhatsApp.</p>
            <p className="text-sm text-soft-black/70">Tidak perlu app tambahan. Tim support bantu setup awal.</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-soft-black/70">Banyak member 40+ th sukses. Teknologi cuma alat, bukan halangan.</p>
      </>
    ),
  },
  {
    question: 'Apa bedanya dengan kursus leadership lain?',
    answer: (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white/50 rounded-xl border border-warm-border text-center">
            <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-terracotta" aria-hidden="true" />
            </div>
            <h4 className="font-medium mb-1">Maxwell Certified</h4>
            <p className="text-sm text-soft-black/70">Metodologi terstruktur, bukan motivational talk biasa</p>
          </div>
          <div className="p-4 bg-white/50 rounded-xl border border-warm-border text-center">
            <div className="w-12 h-12 rounded-xl bg-sage-green/10 flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-sage-green" aria-hidden="true" />
            </div>
            <h4 className="font-medium mb-1">Atomy Ecosystem</h4>
            <p className="text-sm text-soft-black/70">Produk konsumsi real + compensation plan fair</p>
          </div>
          <div className="p-4 bg-white/50 rounded-xl border border-warm-border text-center">
            <div className="w-12 h-12 rounded-xl bg-muted-clay/10 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-muted-clay" aria-hidden="true" />
            </div>
            <h4 className="font-medium mb-1">Komunitas Ibu</h4>
            <p className="text-sm text-soft-black/70">Peer support, bukan guru-murid. Saling nemenin tumbuh</p>
          </div>
        </div>
      </>
    ),
  },
  {
    question: 'Bisa keluar kapan saja? Ada penalty?',
    answer: (
      <>
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl mb-4">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" />
          <span className="font-medium text-green-800">Bisa kapan saja, tanpa penalty.</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" aria-hidden="true" />
            <span>Level 2: Cancel subscription → akses berhenti. Data tetap aman.</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" aria-hidden="true" />
            <span>Level 3: Stop order Atomy → tetap pakai produk, komisi berhenti.</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" aria-hidden="true" />
            <span>Tidak ada kontrak mengikat. Tidak ada biaya keluar.</span>
          </div>
        </div>
      </>
    ),
  },
  {
    question: 'Siapa Ika Irawati?',
    answer: (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white/50 rounded-xl border border-warm-border text-center">
            <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-terracotta" aria-hidden="true" />
            </div>
            <h4 className="font-medium mb-1">Maxwell Leadership Certified Coach</h4>
            <p className="text-sm text-soft-black/70">Sertifikasi resmi John Maxwell</p>
          </div>
          <div className="p-4 bg-white/50 rounded-xl border border-warm-border text-center">
            <div className="w-12 h-12 rounded-xl bg-sage-green/10 flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-sage-green" aria-hidden="true" />
            </div>
            <h4 className="font-medium mb-1">Atomy Master Distributor</h4>
            <p className="text-sm text-soft-black/70">Leader resmi Atomy Indonesia</p>
          </div>
          <div className="p-4 bg-white/50 rounded-xl border border-warm-border text-center">
            <div className="w-12 h-12 rounded-xl bg-muted-clay/10 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-muted-clay" aria-hidden="true" />
            </div>
            <h4 className="font-medium mb-1">Founder Komunitas Tumbuh Bersama</h4>
            <p className="text-sm text-soft-black/70">1.240+ member aktif di Indonesia</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-soft-black/70">5+ tahun mentoring ibu jadi leader mandiri. Misi: bikin ibu Indonesia percaya diri, sehat, mandiri finansial.</p>
      </>
    ),
  },
]

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="section-padding bg-warm-sand"
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
          <span className="section-label">TRANSPARANSI</span>
          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-2 mb-4"
          >
            Pertanyaan yang Sering Diajukan — Jujur & Transparan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg text-soft-black/70"
          >
            Kami percaya keputusan terbaik lahir dari informasi lengkap. Tidak ada rahasia, tidak ada tekanan. Hanya fakta.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </motion.div>

        {/* Final Trust Signal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="mt-16 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="body-base text-soft-black/70 mb-6 max-w-lg mx-auto"
          >
            Masih punya pertanyaan? Langsung chat ke WA kami — tim kami jawab langsung, no bot, no pressure.
          </motion.p>
          <a
            href="https://api.whatsapp.com/send/?phone=6285312200796&text=Halo%20Admin%2C%20saya%20mau%20tanya%20soal%20program%20Komunitas%20Tumbuh%20Bersama"
            className="btn-primary inline-flex items-center gap-2"
            aria-label="Chat langsung ke WhatsApp Ika"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Tanya Langsung ke WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function FAQItem({ faq, index }: { faq: { question: string; answer: React.ReactNode }; index: number }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: 'easeOut' }}
      className="bg-white rounded-2xl border border-warm-border overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <motion.p
          initial={false}
          animate={{ opacity: 1 }}
          className="body-base font-medium text-soft-black text-left pr-8"
        >
          {faq.question}
        </motion.p>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex-shrink-0 w-6 h-6 text-terracotta"
          aria-hidden="true"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <motion.div
        id={`faq-answer-${index}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="overflow-hidden"
        role="region"
        aria-labelledby={`faq-question-${index}`}
      >
        <div className="px-6 pb-6 border-t border-warm-border/50">
          {faq.answer}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Need to import React for useState
import React from 'react'