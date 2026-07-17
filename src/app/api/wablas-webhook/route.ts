// Wablas Webhook — menerima incoming message, membalas via response body
// Wablas mengirim POST ke endpoint ini, response body-nya menjadi auto-reply

const WABLAS_TOKEN = 'Vn2UG8k2UJI1AuC8ptPC3YTqCb1HKCzCJGdWfkiBdYE2Yovczhbscn6'
const WABLAS_SECRET = 'HcU2B9tK'
const NOTION_DB_ID = '39d95b59-1c49-81ac-b7d7-cff618972925'

function getWelcome() {
  return "Halo Bunda! 👋 Selamat datang di 7-Hari Growth Challenge GRATIS dari Komunitas Tumbuh Bersama!\n\nIkuti challenge ini untuk:\n✨ Mindset leadership yang kuat\n✨ Komunitas support & accountability\n✨ Earning potential yang nyata\n\nSiap mulai transformasi? 💪\n\nKetik: YA (untuk daftar)\nKetik: TANYA (untuk FAQ)"
}

function getFAQ() {
  return "FAQ — 7-Hari Growth Challenge\n\n❓ Apa itu? Program 7 hari gratis fokus leadership.\n💰 Gratis 100%.\n👥 Join komunitas khusus member.\n\nKetik YA untuk daftar!"
}

function getQuestions() {
  return "Siapa nama lengkap Bunda? 🌸"
}

export async function POST(req: Request) {
  try {
    // Parse incoming data from Wablas
    const rawText = await req.text()
    let data: any = {}
    try { data = JSON.parse(rawText) } catch { data = {} }

    const message = (data?.message || '').trim()
    const phone = data?.phone || ''
    const pushName = data?.pushName || data?.name || ''
    
    if (!phone || !message) {
      return new Response('no message', { status: 200 })
    }

    const msg = message.toLowerCase().trim()

    // === STOP ===
    if (['stop','berhenti','cancel','batal','keluar'].some(k => msg.includes(k))) {
      return new Response('Kamu berhenti menerima broadcast. Ketik MULAI kapan saja untuk bergabung kembali.')
    }

    // === HELP ===
    if (['tanya','help','bantu','info','faq','apa itu'].some(k => msg.includes(k))) {
      return new Response(getFAQ())
    }

    // === YES ===
    if (['ya','iya','y','yes','siap','oke','ok','okay','lanjut','mau'].some(k => msg === k || msg.startsWith(k))) {
      // Create Notion entry
      const key = process.env.NOTION_TOKEN || ''
      if (key) {
        const body = JSON.stringify({
          parent: { database_id: NOTION_DB_ID },
          properties: {
            'Lead Name': { title: [{ text: { content: `${phone} — ${pushName || ''}` } }] },
            'Day 1': { checkbox: false },
            'Completed': { checkbox: false },
            'Completion Rate': { number: 0 },
          }
        })
        fetch('https://api.notion.com/v1/pages', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${key}`, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' },
          body
        }).catch(() => {})
      }
      return new Response(getQuestions())
    }

    // === GREETINGS ===
    if (['hai','halo','hello','hi','hey','selamat','pagi','siang','sore','malam',
        'assalamualaikum','mulai','join','gabung','daftar','mau','tes','test','coba'].some(k => msg.includes(k))) {
      return new Response(getWelcome())
    }

    // === ANYTHING ELSE — check Notion for existing progress ===
    return new Response(getWelcome())
    
  } catch (e: any) {
    console.error('[WEBHOOK]', e.message)
    return new Response('Error', { status: 200 })
  }
}

export async function GET() {
  return new Response('Webhook active')
}