import { Metadata } from 'next'
import Hero from '@/components/Hero'
import KenalanDenganIka from '@/components/KenalanDenganIka'
import ProblemSection from '@/components/ProblemSection'
import LevelSystem from '@/components/LevelSystem'
import ChallengeSection from '@/components/ChallengeSection'
import Testimonials from '@/components/Testimonials'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import StickyCTA from '@/components/StickyCTA'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'GrowWithIka — Growth First, Business Later | Komunitas Tumbuh Bersama',
  description: 'Ika Irawati membantu ibu & keluarga bertumbuh dalam kepemimpinan, hidup lebih sehat, dan membangun kesejahteraan melalui komunitas, Maxwell Leadership, dan bisnis Atomy berorientasi jangka panjang.',
}

export default function Home() {
  return (
    <>
      <Script
        id="whatsapp-sdk"
        src="https://static.whatsapp.net/click-to-chat.js"
        strategy="lazyOnload"
      />
      <main id="main-content" className="min-h-screen pb-[calc(100px+env(safe-area-inset-bottom))]">
        <Hero />
        <KenalanDenganIka />
        <ProblemSection />
        <LevelSystem />
        <ChallengeSection />
        <Testimonials />
        <FAQSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  )
}
// Force rebuild Fri Jul 17 05:33:32 UTC 2026
