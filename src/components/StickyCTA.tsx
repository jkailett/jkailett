'use client'

import Link from 'next/link'

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:pb-6 md:hidden">
      <div className="flex items-center gap-3 max-w-xl mx-auto">
        <a
          href="#tantangan"
          className="flex-1 btn-primary py-3 text-center group"
          aria-label="Gabung 7 Hari Growth Challenge gratis via WhatsApp"
        >
          <span className="mr-2" aria-hidden="true">💬</span>
          <span>Gabung 7 Hari Gratis</span>
        </a>

        <a
          href="https://api.whatsapp.com/send/?phone=6285312200796&text=Halo%20Admin%2C%20saya%20tertarik%20dengan%207%20Hari%20Memulai%20Perubahan"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary py-3"
          aria-label="Chat langsung dengan Ika via WhatsApp"
        >
          <span className="mr-2" aria-hidden="true">💬</span>
          Chat Ika
        </a>
      </div>
    </div>
  )
}
