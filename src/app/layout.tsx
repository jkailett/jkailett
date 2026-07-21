import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GrowWithIka — Growth First, Business Later | Komunitas Tumbuh Bersama',
  description: 'Ika Irawati membantu ibu & keluarga bertumbuh dalam kepemimpinan, hidup lebih sehat, dan membangun kesejahteraan melalui komunitas, Maxwell Leadership, dan bisnis Atomy berorientasi jangka panjang.',
  keywords: ['Ika Irawati', 'GrowWithIka', 'Komunitas Tumbuh Bersama', 'Maxwell Leadership', 'Atomy Business', 'Growth Coaching', 'Women Leadership', 'Financial Freedom'],
  authors: [{ name: 'Ika Irawati' }],
  creator: 'Ika Irawati',
  publisher: 'GrowWithIka',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://growwithika.com',
    title: 'GrowWithIka — Growth First, Business Later',
    description: 'Ika Irawati membantu ibu & keluarga bertumbuh dalam kepemimpinan, kesehatan, dan kesejahteraan.',
    siteName: 'GrowWithIka',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ika Irawati - Growth & Leadership Mentor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrowWithIka — Growth First, Business Later',
    description: 'Ika Irawati membantu ibu & keluarga bertumbuh dalam kepemimpinan, kesehatan, dan kesejahteraan.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: '#D4C4B0',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.whatsapp.com" />
        <link rel="preconnect" href="https://api.whatsapp.com" />
      </head>
      <body className={`${inter.className} ${playfair.className} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-terracotta text-white px-4 py-2 rounded-md"
        >
          Skip to main content
        </a>
        <div id="main-content-wrapper" className="min-h-screen pb-[calc(100px+env(safe-area-inset-bottom))]">
          {children}
        </div>
      </body>
    </html>
  )
}// Trigger fresh build - Fri Jul 17 13:22:28 UTC 2026
