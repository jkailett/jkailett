import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { MessageCircle, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'

const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{7,9}$/
const schema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(50, 'Nama terlalu panjang'),
  phone: z.string().min(10, 'Nomor WA minimal 10 digit').max(15, 'Nomor WA terlalu panjang').regex(phoneRegex, 'Format nomor WA Indonesia tidak valid'),
})

type FormData = z.infer<typeof schema>

export default function ChallengeForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setStatus('submitting')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    let phone = data.phone.replace(/\D/g, '')
    if (phone.startsWith('0')) phone = '62' + phone.slice(1)
    if (!phone.startsWith('62')) phone = '62' + phone
    const message = 'Halo Ika, saya ' + data.name + ' ingin gabung 7 Hari Growth Challenge gratis via WA'
    window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(message), '_blank')
    setStatus('success')
    reset()
  }

  if (status === 'success') {
    return (
      React.createElement('div', { className: 'text-center py-12' },
        React.createElement('div', { className: 'w-20 h-20 rounded-full bg-sage-green/10 flex items-center justify-center mx-auto mb-6' },
          React.createElement(CheckCircle2, { className: 'w-12 h-12 text-sage-green' })
        ),
        React.createElement('h3', { className: 'text-2xl font-bold font-serif text-sage-green mb-3' }, 'Terima Kasih!'),
        React.createElement('p', { className: 'text-soft-black/70 mb-8 max-w-xs mx-auto' }, 'Link grup Tantangan 7 Hari sudah terbuka di WhatsApp. Cek WA kamu dan mulai hari ini!'),
        React.createElement('button', { onClick: () => setStatus('idle'), className: 'inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-sage-green text-sage-green hover:bg-sage-green/5' }, 'Daftar Lagi')
      )
    )
  }

  return (
    React.createElement('form', { onSubmit: handleSubmit(onSubmit), className: 'space-y-5', noValidate: true },
      React.createElement('div', { className: 'space-y-5' },
        React.createElement('div', null,
          React.createElement('label', { htmlFor: 'name', className: 'block text-sm font-medium text-soft-black mb-2' }, 'Nama Panggilan Bunda', React.createElement('span', { className: 'text-terracotta' }, '*')),
          React.createElement('input', { ...register('name'), id: 'name', type: 'text', placeholder: 'Contoh: Bunda Sari', className: 'w-full px-4 py-4 rounded-xl border-2 border-warm-sand/60 bg-white/70 backdrop-blur-sm text-soft-black placeholder:text-soft-black/30 focus:outline-none focus:border-sage-green/50 focus:ring-2 focus:ring-sage-green/20 transition-all duration-300 ' + (errors.name ? 'border-terracotta' : ''), 'aria-invalid': errors.name ? 'true' : 'false' }),
          errors.name && React.createElement('p', { className: 'mt-1.5 text-sm text-terracotta flex items-center gap-1' }, React.createElement(AlertCircle, { className: 'w-4 h-4' }), errors.name.message)
        ),
        React.createElement('div', null,
          React.createElement('label', { htmlFor: 'phone', className: 'block text-sm font-medium text-soft-black mb-2' }, 'Nomor WhatsApp', React.createElement('span', { className: 'text-terracotta' }, '*')),
          React.createElement('div', { className: 'relative' },
            React.createElement('span', { className: 'absolute left-4 top-1/2 -translate-y-1/2 text-soft-black/50 font-medium' }, '+62'),
            React.createElement('input', { ...register('phone'), id: 'phone', type: 'tel', placeholder: '8xx-xxxx-xxxx', className: 'w-full pl-12 pr-4 py-4 rounded-xl border-2 border-warm-sand/60 bg-white/70 backdrop-blur-sm text-soft-black placeholder:text-soft-black/30 focus:outline-none focus:border-sage-green/50 focus:ring-2 focus:ring-sage-green/20 transition-all duration-300 ' + (errors.phone ? 'border-terracotta' : ''), 'aria-invalid': errors.phone ? 'true' : 'false' })
          ),
          errors.phone && React.createElement('p', { className: 'mt-1.5 text-sm text-terracotta flex items-center gap-1' }, React.createElement(AlertCircle, { className: 'w-4 h-4' }), errors.phone.message)
        )
      ),
      React.createElement('button', { type: 'submit', disabled: status === 'submitting', className: 'w-full bg-terracotta hover:bg-terracotta/90 text-white font-medium py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60' },
        status === 'submitting'
          ? React.createElement(React.Fragment, null, React.createElement(Loader2, { className: 'w-5 h-5 animate-spin' }), ' Mengirim...')
          : React.createElement(React.Fragment, null, React.createElement(MessageCircle, { className: 'w-5 h-5' }), ' Gabung 7 Hari Growth Challenge')
      ),
      React.createElement('p', { className: 'text-center text-xs text-soft-black/50' }, 'Dengan mendaftar, kamu setuju menerima broadcast WA tantangan 7 hari.')
    )
  )
}
EOF
