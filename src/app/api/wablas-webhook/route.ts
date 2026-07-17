import { NextRequest, NextResponse } from 'next/server'

const WABLAS_TOKEN = process.env.WABLAS_TOKEN || 'Vn2UG8k2UJI1AuC8ptPC3YTqCb1HKCzCJGdWfkiBdYE2Yovczhbscn6'
const WABLAS_SECRET = process.env.WABLAS_SECRET || 'HcU2B9tK'
const WABLAS_API = 'https://tegal.wablas.com/api'
const NOTION_DB_ID = '39d95b59-1c49-81ac-b7d7-cff618972925'

const WELCOME = `Halo Bunda! 👋 Selamat datang di 7-Hari Growth Challenge GRATIS!\n\nSiap mulai? Ketik: YA (daftar) atau TANYA (FAQ) 💪`

const FAQ = `FAQ — 7-Hari Growth Challenge\n\n❓ Apa itu? Program 7 hari gratis fokus leadership.\n💰 Gratis 100%.\n👥 Join komunitas khusus member.\n\nKetik YA untuk daftar!`

function keywordMatch(text: string, keywords: string[]) {
  const lower = text.toLowerCase().trim()
  return keywords.some(kw => lower.includes(kw) || lower.startsWith(kw) || lower === kw)
}

async function sendWablas(phone: string, message: string) {
  const url = `${WABLAS_API}/send-message?token=${WABLAS_TOKEN}.${WABLAS_SECRET}&phone=${encodeURIComponent(phone)}&message=${encodeURIComponent(message)}`
  await fetch(url)
}

async function notionQuery(phone: string) {
  const key = process.env.NOTION_TOKEN
  if (!key) return null
  
  const resp = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB_ID}/query`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filter: {
        property: 'Lead Name',
        title: { contains: phone }
      }
    })
  })
  const data = await resp.json()
  return data.results?.[0] || null
}

async function notionCreate(phone: string, name: string) {
  const key = process.env.NOTION_TOKEN
  if (!key) return
  
  await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        'Lead Name': { title: [{ text: { content: `${phone} — ${name || 'N/A'}` } }] },
        'Day 1': { checkbox: false },
        'Completed': { checkbox: false },
        'Completion Rate': { number: 0 },
      }
    })
  })
}

async function notionUpdate(pageId: string, field: string, value: any) {
  const key = process.env.NOTION_TOKEN
  if (!key) return
  
  if (field === 'name') {
    // Store as Lead Name = "Phone — Name"
    await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${key}`, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        properties: { 'Lead Name': { title: [{ text: { content: value } }] } }
      })
    })
  }
  if (field === 'day1') {
    await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${key}`, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        properties: { 'Day 1': { checkbox: true }, 'Completion Rate': { number: 14.29 } }
      })
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const rawMsg = (data?.message || data?.text || '').trim()
    const phone = data?.phone || data?.from || ''
    if (!phone) return NextResponse.json({ status: false, error: 'No phone' })

    const msgLower = rawMsg.toLowerCase().trim()

    // === STOP ===
    if (keywordMatch(msgLower, ['stop', 'berhenti', 'cancel', 'batal', 'keluar', 'selesai'])) {
      return NextResponse.json({ status: true, message: 'Unsubscribed' })
    }

    // === HELP ===
    if (keywordMatch(msgLower, ['tanya', 'help', 'bantu', 'info', 'faq', 'apa itu'])) {
      await sendWablas(phone, FAQ)
      return NextResponse.json({ status: true, message: 'FAQ sent' })
    }

    // === YES ===
    if (keywordMatch(msgLower, ['ya', 'iya', 'y', 'yes', 'siap', 'oke', 'ok', 'lanjut', 'mau'])) {
      await notionCreate(phone, '')
      await sendWablas(phone, 'Siapa nama lengkap Bunda? 🌸')
      return NextResponse.json({ status: true, message: 'Flow started' })
    }

    // === GREETINGS ===
    if (keywordMatch(msgLower, ['hai', 'halo', 'hello', 'hi', 'hey', 'selamat', 'pagi', 'siang', 'sore', 'malam',
        'assalamualaikum', 'mulai', 'join', 'gabung', 'daftar', 'mau', 'tes', 'test', 'coba', 'bangun', 'tumbuh'])) {
      await sendWablas(phone, WELCOME)
      return NextResponse.json({ status: true, message: 'Welcome sent' })
    }

    // === ANYTHING ELSE — check if user is in flow (has Notion entry without data) ===
    const existing = await notionQuery(phone)
    
    if (!existing) {
      // Unknown user — treat as greeting
      await sendWablas(phone, WELCOME)
      return NextResponse.json({ status: true, message: 'Welcome sent' })
    }

    // User exists — parse progress from Lead Name field
    const props = existing.properties || {}
    const leadName = props['Lead Name']?.title?.[0]?.text?.content || ''
    const alreadyComplete = props['Day 1']?.checkbox === true

    if (alreadyComplete) {
      await sendWablas(phone, `Halo lagi! Day 1 sudah dikirim. Besok jam 7 pagi kita lanjut Day 2 ya 🌸`)
      return NextResponse.json({ status: true, message: 'Already completed' })
    }

    // Parse progress: "phone — name || city:xx || goal:xx || source:xx"
    const parts = leadName.split('||')
    
    if (parts.length === 1 && !leadName.includes('—')) {
      // Step 0: No name yet → save name
      const newLeadName = `${phone} — ${rawMsg}`
      await notionUpdate(existing.id, 'name', newLeadName)
      await sendWablas(phone, 'Dari kota mana, Bunda? 🏙️')
    } else if (parts.length === 1) {
      // Step 1: Has name, need city
      const base = leadName.split('—')[1]?.trim() || rawMsg
      const updated = `${leadName} || city: ${rawMsg}`
      await notionUpdate(existing.id, 'name', updated)
      await sendWablas(phone, 'Apa tujuan Bunda ikut challenge ini? 🎯')
    } else if (parts.length === 2) {
      // Step 2: Has name+city, need goal
      const updated = `${leadName} || goal: ${rawMsg}`
      await notionUpdate(existing.id, 'name', updated)
      await sendWablas(phone, 'Darimana Bunda tahu GrowWithIka? (IG, TikTok, Teman, dll) 📱')
    } else if (parts.length === 3) {
      // Step 3: Has name+city+goal, need source
      const updated = `${leadName} || source: ${rawMsg}`
      await notionUpdate(existing.id, 'name', updated)
      await notionUpdate(existing.id, 'day1', true)
      const day1text = `🎉 Terima kasih! Data sudah lengkap.\n\n📚 *Day 1: Bangun Mentalitas Bertumbuh*\n✅ Tulis 3 hal yang disyukuri\n✅ Set 1 goal kecil\n✅ Baca refleksi mindset\n\nBesok jam 7 pagi kita lanjut! 🚀`
      await sendWablas(phone, day1text)
    } else {
      // Already in progress - send appropriate next step
      await sendWablas(phone, `Halo lagi! Silakan lanjutkan jawab pertanyaan sebelumnya ya 🌸`)
    }

    return NextResponse.json({ status: true, message: 'Processed' })
  } catch (error: any) {
    console.error('[WEBHOOK] Error:', error.message)
    return NextResponse.json({ status: false, error: error.message })
  }
}

export async function GET() {
  return NextResponse.json({ status: true, message: 'Webhook active' })
}