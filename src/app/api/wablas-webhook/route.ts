import { NextRequest, NextResponse } from 'next/server'

const WABLAS_TOKEN = process.env.WABLAS_TOKEN || ''
const WABLAS_SECRET = process.env.WABLAS_SECRET || 'HcU2B9tK'
const WABLAS_API = 'https://tegal.wablas.com/api'
const NOTION_DB_ID = '39d95b591c4981acb7d7cff618972925'

interface UserState {
  step: number
  data: Record<string, string>
  notionPageId?: string
}

const userStates = new Map<string, UserState>()

const QUESTIONS = [
  { step: 1, field: 'name', question: 'Siapa nama lengkap Bunda? 🌸' },
  { step: 2, field: 'city', question: 'Dari kota mana, Bunda? 🏙️' },
  { step: 3, field: 'goal', question: 'Apa tujuan Bunda ikut challenge ini? 🎯' },
  { step: 4, field: 'source', question: 'Darimana Bunda tahu GrowWithIka? (IG, TikTok, Teman, Lainnya) 📱' },
]

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
    const message = (data?.message || data?.text || '').trim()
    const phone = data?.phone || data?.from || ''

    if (!phone) return NextResponse.json({ status: false, error: 'No phone' })

    // === MULAI ===
    if (message.toUpperCase() === 'MULAI') {
      userStates.delete(phone)
      return NextResponse.json({ status: true, message: 'Welcome sent via auto-reply' })
    }

    // === YA — start data collection ===
    if (message.toUpperCase() === 'YA') {
      userStates.set(phone, { step: 1, data: {} })
      await sendWablas(phone, QUESTIONS[0].question)
      return NextResponse.json({ status: true, message: 'Flow started' })
    }

    // === STOP ===
    if (message.toUpperCase() === 'STOP') {
      userStates.delete(phone)
      return NextResponse.json({ status: true, message: 'Unsubscribed' })
    }

    // === Sequential answer processing ===
    const state = userStates.get(phone)
    if (state && state.step >= 1 && state.step <= QUESTIONS.length) {
      const currentQ = QUESTIONS[state.step - 1]
      state.data[currentQ.field] = message
      state.step++

      if (state.step > QUESTIONS.length) {
        // Create Notion entry
        const pageId = await notionCreateEntry(phone, state.data.name || '')
        
        // Send completion + Day 1 content
        const day1 = `🎉 Terima kasih ${state.data.name || 'Bunda'} dari ${state.data.city || 'Indonesia'}! Data sudah tersimpan.\n\n📚 *Day 1: Bangun Mentalitas Bertumbuh*\n\nHari ini:\n✅ Tulis 3 hal yang Bunda syukuri\n✅ Set 1 goal kecil untuk besok\n✅ Baca refleksi mindset\n\nBesok jam 7 pagi kita lanjut! 🚀`
        
        await sendWablas(phone, day1)
        userStates.delete(phone)
        return NextResponse.json({ status: true, message: 'Complete', data: state.data })
      }

      // Send next question
      await sendWablas(phone, QUESTIONS[state.step - 1].question)
      return NextResponse.json({ status: true, message: `Question ${state.step} sent` })
    }

    return NextResponse.json({ status: true, message: 'Received' })
  } catch (error: any) {
    console.error('[WEBHOOK] Error:', error.message)
    return NextResponse.json({ status: false, error: error.message })
  }
}

export async function GET() {
  return NextResponse.json({ status: true, message: 'Webhook active', active_users: userStates.size })
}