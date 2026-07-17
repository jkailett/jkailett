import { NextRequest, NextResponse } from 'next/server'

const WABLAS_TOKEN = process.env.WABLAS_TOKEN || ''
const WABLAS_SECRET = process.env.WABLAS_SECRET || 'HcU2B9tK'
const WABLAS_API = 'https://tegal.wablas.com/api'
const NOTION_DB_ID = '39d95b591c4981acb7d7cff618972925'

interface UserState {
  step: number
  data: Record<string, string>
}

const userStates = new Map<string, UserState>()

// Adaptive greeting keywords (case-insensitive)
const GREETING_KEYWORDS = [
  'hai', 'halo', 'hello', 'hi', 'hey', 'selamat', 'pagi', 'siang', 'sore', 'malam',
  'assalamualaikum', 'assalamu\'alaikum', 'asslm', 'assalam',
  'tes', 'test', 'coba', 'mau', 'mulai', 'join', 'gabung', 'daftar',
  'bangun', 'tumbuh', 'growth',
]

const YES_KEYWORDS = ['ya', 'iya', 'y', 'yes', 'siap', 'oke', 'ok', 'okay', 'mau dong', 'iya dong', 'tentu', 'lanjut']

const HELP_KEYWORDS = ['tanya', 'help', 'bantu', 'info', 'faq', 'apa itu', 'bagaimana']
const STOP_KEYWORDS = ['stop', 'berhenti', 'cancel', 'batal', 'keluar', 'selesai']

const QUESTIONS = [
  { step: 1, field: 'name', question: 'Siapa nama lengkap Bunda? 🌸' },
  { step: 2, field: 'city', question: 'Dari kota mana, Bunda? 🏙️' },
  { step: 3, field: 'goal', question: 'Apa tujuan Bunda ikut challenge ini? 🎯' },
  { step: 4, field: 'source', question: 'Darimana Bunda tahu GrowWithIka? (IG, TikTok, Teman, Lainnya) 📱' },
]

function keywordMatch(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase().trim()
  return keywords.some(kw => lower === kw || lower.startsWith(kw) || lower.includes(kw))
}

async function sendWablas(phone: string, message: string) {
  const url = `${WABLAS_API}/send-message?token=${WABLAS_TOKEN}.${WABLAS_SECRET}&phone=${encodeURIComponent(phone)}&message=${encodeURIComponent(message)}`
  await fetch(url).catch(e => console.error('[WABLAS] Send error:', e.message))
}

async function notionCreateEntry(phone: string, name: string) {
  const key = process.env.NOTION_TOKEN
  if (!key) return null
  
  const resp = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        'Lead Name': { title: [{ text: { content: `${phone} — ${name || 'N/A'}` } }] },
        'Day 1': { checkbox: true },
        'Completed': { checkbox: false },
        'Completion Rate': { number: 14.29 },
      }
    })
  })
  
  const result = await resp.json()
  return result.id || null
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const rawMsg = (data?.message || data?.text || '').trim()
    const phone = data?.phone || data?.from || ''

    if (!phone) return NextResponse.json({ status: false, error: 'No phone' })

    const message = rawMsg.toLowerCase().trim()

    // === STOP keywords — priority check (even during flow) ===
    if (keywordMatch(message, STOP_KEYWORDS)) {
      userStates.delete(phone)
      return NextResponse.json({ status: true, message: 'Unsubscribed' })
    }

    // Check if user is in state flow (answering questions)
    const state = userStates.get(phone)
    
    if (state && state.step >= 1 && state.step <= QUESTIONS.length) {
      // User is answering a question — save answer and proceed
      const currentQ = QUESTIONS[state.step - 1]
      state.data[currentQ.field] = rawMsg  // Keep original case
      state.step++

      if (state.step > QUESTIONS.length) {
        // All questions answered
        await notionCreateEntry(phone, state.data.name || '')
        
        const day1 = `🎉 Terima kasih ${state.data.name || 'Bunda'} dari ${state.data.city || 'Indonesia'}! Data sudah tersimpan.\n\n📚 *Day 1: Bangun Mentalitas Bertumbuh*\n\nKesuksesan dimulai dari dalam. Hari ini:\n✅ Tulis 3 hal yang Bunda syukuri\n✅ Set 1 goal kecil untuk besok\n✅ Baca refleksi mindset\n\nBesok jam 7 pagi kita lanjut Day 2! 🚀`
        
        await sendWablas(phone, day1)
        userStates.delete(phone)
        return NextResponse.json({ status: true, message: 'Complete', data: state.data })
      }

      // Send next question
      await sendWablas(phone, QUESTIONS[state.step - 1].question)
      return NextResponse.json({ status: true, message: `Question ${state.step} sent` })
    }

    // === YES keywords — start data collection ===
    if (keywordMatch(message, YES_KEYWORDS) && !keywordMatch(message, GREETING_KEYWORDS)) {
      userStates.set(phone, { step: 1, data: {} })
      await sendWablas(phone, QUESTIONS[0].question)
      return NextResponse.json({ status: true, message: 'Flow started' })
    }

    // === HELP keywords ===
    if (keywordMatch(message, HELP_KEYWORDS)) {
      const faq = `FAQ — 7-Hari Growth Challenge\n\n❓ Apa itu? Program 7 hari transformasi leadership gratis.\n💰 Gratis 100% — tidak ada biaya.\n👥 Join komunitas khusus member.\n\nKetik YA untuk daftar sekarang!`
      await sendWablas(phone, faq)
      return NextResponse.json({ status: true, message: 'FAQ sent' })
    }

    // === GREETING keywords (including MULAI, HAI, etc.) ===
    if (keywordMatch(message, GREETING_KEYWORDS)) {
      const welcome = `Halo Bunda! 👋 Selamat datang di 7-Hari Growth Challenge GRATIS dari Komunitas Tumbuh Bersama!\n\nIkuti challenge ini untuk:\n✨ Mindset leadership yang kuat\n✨ Komunitas support & accountability\n✨ Earning potential yang nyata\n\nSiap mulai? Ketik: YA (daftar) atau TANYA (FAQ) 💪`
      await sendWablas(phone, welcome)
      return NextResponse.json({ status: true, message: 'Welcome sent' })
    }

    // Fallback — unknown message, try to match anyway
    // If user sends something that's not clearly a greeting/yes/help/stop, treat as greeting response
    userStates.set(phone, { step: 1, data: {} })
    await sendWablas(phone, QUESTIONS[0].question)
    return NextResponse.json({ status: true, message: 'Fallback flow started' })
  } catch (error: any) {
    console.error('[WEBHOOK] Error:', error.message)
    return NextResponse.json({ status: false, error: error.message })
  }
}

export async function GET() {
  return NextResponse.json({ status: true, message: 'Webhook active', active_users: userStates.size })
}