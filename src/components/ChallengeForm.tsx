import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MessageCircle, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'

const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{7,9}$/
const schema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(50, 'Nama terlalu panjang'),
  phone: z.string().min(10, 'Nomor WA minimal 10 digit').max(15, 'Nomor WA terlalu panjang').regex(phoneRegex, 'Format nomor WA Indonesia tidak valid'),
})

type FormData = z.infer<typeof schema>

function MotionInput(props: any) {
  return React.createElement(motion.input, props)
}

function MotionDiv(props: any) {
  return React.createElement(motion.div, props)
}

function MotionH3(props: any) {
  return React.createElement(motion.h3, props)
}

function MotionP(props: any) {
  return React.createElement(motion.p, props)
}

function MotionButton(props: any) {
  return React.createElement(motion.button, props)
}

export default function ChallengeForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submittedName, setSubmittedName] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('submitting')
    await new Promise((resolve) => setTimeout(resolve, 1500))

    let phone = data.phone.replace(/\D/g, '')
    if (phone.startsWith('0')) phone = '62' + phone.slice(1)
    if (!phone.startsWith('62')) phone = '62' + phone

    const message = `Halo Ika, saya ${data.name} ingin gabung 7 Hari Growth Challenge gratis via WA`
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(waLink, '_blank')

    setSubmittedName(data.name)
    setStatus('success')
    reset()
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-soft-black mb-2">
              Nama Panggilan Bunda <span className="text-terracotta">*</span>
            </label>
            <input
              {...register('name')}
              id="name"
              type="text"
              placeholder="Contoh: Bunda Sari"
              className={`w-full px-4 py-4 rounded-xl border-2 border-warm-sand/60 bg-white/70 backdrop-blur-sm text-soft-black placeholder:text-soft-black/30 focus:outline-none focus:border-sage-green/50 focus:ring-2 focus:ring-sage-green/20 transition-all duration-300 ${errors.name ? 'border-terracotta' : ''}`}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-terracotta flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-soft-black mb-2">
              Nomor WhatsApp <span className="text-terracotta">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-black/50 font-medium">+62</span>
              <input
                {...register('phone')}
                id="phone"
                type="tel"
                placeholder="8xx-xxxx-xxxx"
                className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 border-warm-sand/60 bg-white/70 backdrop-blur-sm text-soft-black placeholder:text-soft-black/30 focus:outline-none focus:border-sage-green/50 focus:ring-2 focus:ring-sage-green/20 transition-all duration-300 ${errors.phone ? 'border-terracotta' : ''}`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1.5 text-sm text-terracotta flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-terracotta hover:bg-terracotta/90 text-white font-medium py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              <MessageCircle className="w-5 h-5" />
              Gabung 7 Hari Growth Challenge
            </>
          )}
        </button>

        <p className="text-center text-xs text-soft-black/50">
          Dengan mendaftar, kamu setuju menerima broadcast WA tantangan 7 hari.
        </p>
      </form>
    )
  }

  const renderSuccess = () => {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-sage-green/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-sage-green" />
        </div>
        <h3 className="text-2xl font-bold font-serif text-sage-green mb-3">
          Terima Kasih!
        </h3>
        <p className="text-soft-black/70 mb-8 max-w-xs mx-auto">
          Link grup Tantangan 7 Hari sudah terbuka di WhatsApp. Cek WA kamu dan mulai hari ini!
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-sage-green text-sage-green hover:bg-sage-green/5 transition-all duration-300"
        >
          Daftar Lagi
        </button>
      </div>
    )
  }

  return (
    <div className="w-full">
      {status === 'success' ? renderSuccess() : renderForm()}
    </div>
  )
}