// Wablas Webhook — response body = balasan ke user. Silent = 204 No Content
const WABLAS_TOKEN = 'Vn2UG8k2UJI1AuC8ptPC3YTqCb1HKCzCJGdWfkiBdYE2Yovczhbscn6'
const WABLAS_SECRET = 'HcU2B9tK'
const NOTION_DB_ID = '39d95b59-1c49-81ac-b7d7-cff618972925'
const NOTION_VER = '2022-06-28'

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

function welcome() { return "Halo Bunda! 👋 Selamat datang di 7 Hari Memulai Perubahan — GRATIS!\n\nIkuti 7 hari ini untuk:\n✨ Mindset leadership yg kuat\n✨ Kebiasaan positif baru\n✨ Langkah kecil menuju perubahan\n\nSiap mulai? 💪\n\nKetik: YA (daftar)\nKetik: TANYA (info)" }

function faqMsg() { return "Info — 7 Hari Memulai Perubahan\n\n❓ Apa ini? Program 7 hari GRATIS untuk bangun mindset leadership dan mulai perubahan kecil setiap hari.\n💰 Gratis 100%.\n👥 Join komunitas khusus member.\n\nKetik YA untuk daftar!" }

async function aiRespond(msg: string, context: string): Promise<string | null> {
  try {
    const key = process.env.DEEPSEEK_API_KEY || ''
    if (!key || key.length < 10) return null
    
    const systemPrompt = `Kamu adalah Admin Komunitas Tumbuh Bersama — asisten Ika Irawati.

IDENTITAS:
- Kamu BUKAN AI bot — kamu bagian dari tim Komunitas
- Bicara comme sesama ibu, pakai "Bunda"
- Hangat, santai, gak jualan, gak pressure
- Boleh ceplas-ceplos kayak teman ngobrol

PANDUAN JAWAB:
- Jawab PERTANYAAN user secara langsung dulu, baru arahkan ke program
- JANGAN paksa redirect ke program kalau user cuma tanya sesuatu
- Jawab dengan alami, kayak chat sama teman, bukan template marketing
- Maks 200 karakter. Santai. Natural.

KONTEKS USER:
${context}

LARANGAN:
- Jangan kasih janji penghasilan pasti
- Jangan pressure
- Jangan bahas politik/agama/SARA
- Jangan saran kesehatan/medis`

    const resp = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: msg }
        ],
        max_tokens: 200,
        temperature: 0.7,
      })
    })
    
    if (!resp.ok) return null
    const json = await resp.json()
    return json?.choices?.[0]?.message?.content?.trim() || null
  } catch { return null }
}

/**
 * Cari Notion page by phone number.
 * Retry max 3x dengan jeda 2s — timeout total < 10s (Vercel Hobby limit).
 */
async function notionFindByPhone(phone: string): Promise<{ page: any; fromCache: boolean }> {
  const nt = process.env.NOTION_TOKEN || ''
  if (!nt) return { page: null, fromCache: false }
  
  for (let i = 0; i < 3; i++) {
    try {
      const resp = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB_ID}/query`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${nt}`, 'Notion-Version': NOTION_VER, 'Content-Type': 'application/json' },
        body: JSON.stringify({ filter: { property: 'Lead Name', title: { contains: phone } } })
      })
      const json = await resp.json()
      if (json.results?.length > 0) return { page: json.results[0], fromCache: false }
    } catch {}
    if (i < 2) await delay(2000)
  }
  return { page: null, fromCache: false }
}

async function notionCreate(phone: string): Promise<string | null> {
  const nt = process.env.NOTION_TOKEN || ''
  if (!nt) return null
  try {
    const resp = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${nt}`, 'Notion-Version': NOTION_VER, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parent: { database_id: NOTION_DB_ID },
        properties: {
          'Lead Name': { title: [{ text: { content: `${phone}` } }] },
          'Day 1': { checkbox: false }, 'Completed': { checkbox: false }, 'Completion Rate': { number: 0 },
        }
      })
    })
    if (resp.ok) {
      const json = await resp.json()
      return json.id
    }
    return null
  } catch { return null }
}

async function notionUpdate(pageId: string, body: any) {
  const nt = process.env.NOTION_TOKEN || ''
  if (!nt) return
  try {
    await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${nt}`, 'Notion-Version': NOTION_VER, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
  } catch(e) {}
}

// ─── Sequential flow: 4 steps ──────────────────────────────────────────
// Step 1: nama → Step 2: kota → Step 3: tujuan → Step 4: source → Day 1
//
// Lead Name format:
//   "62899..."              → baruu, no name yet (Step 0)
//   "62899... — Sisca"      → nama done (Step 1), need city
//   "62899... — Sisca || city: Jakarta" → city done (Step 2), need goal
//   "62899... — Sisca || city: Jakarta || goal: Income" → goal done (Step 3), need source
//   "62899... — Sisca || city: Jakarta || goal: Income || source: IG" → complete (Step 4)

type StepHandler = (msg: string, phone: string, leadName: string, pageId: string) => Promise<Response | null>

const STEP_HANDLERS: StepHandler[] = [
  // Step 0 → 1: NAMA
  async (msg, phone, leadName, pageId) => {
    const newName = `${phone} — ${msg}`
    await notionUpdate(pageId, { properties: { 'Lead Name': { title: [{ text: { content: newName } }] } } })
    const nama = msg.split(' ')[0]
    return new Response(`Senang berkenalan, ${nama}! 🌸 Nama yang cantik.\n\nBunda tinggal di kota mana?`)
  },
  // Step 1 → 2: KOTA
  async (msg, phone, leadName, pageId) => {
    const upd = `${leadName} || city: ${msg}`
    await notionUpdate(pageId, { properties: { 'Lead Name': { title: [{ text: { content: upd } }] } } })
    return new Response(`Wah, pasti kota yang indah! 🌸\n\nBoleh cerita, apa yang membuat Bunda tertarik ikut challenge ini? Tujuannya apa?`)
  },
  // Step 2 → 3: TUJUAN
  async (msg, phone, leadName, pageId) => {
    const upd = `${leadName} || goal: ${msg}`
    await notionUpdate(pageId, { properties: { 'Lead Name': { title: [{ text: { content: upd } }] } } })
    return new Response(`Wah, itu keren banget Bunda! 👏 Saya bisa rasain semangatnya dari sini.\n\nTujuan seperti itu sejalan banget dengan visi komunitas kita. Saya yakin Bunda bisa mencapai itu.\n\nBunda kenal Komunitas Tumbuh Bersama dari mana? IG, TikTok, atau dari teman?`)
  },
  // Step 3 → 4: SOURCE
  async (msg, phone, leadName, pageId) => {
    const upd = `${leadName} || source: ${msg}`
    await notionUpdate(pageId, { properties: { 'Lead Name': { title: [{ text: { content: upd } }] }, 'Day 1': { checkbox: true }, 'Completion Rate': { number: 14.29 } } })
    return new Response(`🎉 Terima kasih Bunda! Sekarang Bunda resmi bergabung di 7 Hari Memulai Perubahan.\n\nLangkah pertama adalah yang terberat, dan Bunda sudah melakukannya. Saya bangga! 👏\n\n📚 *Day 1: Mulai dari Dalam* — bersama Ika Irawati\n✅ Tulis 2 hal yang disyukuri hari ini\n✅ Tulis 1 keterampilan baru yang ingin Bunda kuasai\n✅ Balas: *Saya Siap Bertumbuh*\n\nKerjakan dulu ya Bunda, santai aja. Besok kita lanjut Day 2! 🚀`)
  },
]

function detectStep(leadName: string): number {
  // "62899..." → 0
  if (!leadName.includes('—')) return 0
  const parts = leadName.split('||')
  if (parts.length === 1) return 1  // name done
  if (parts.length === 2) return 2  // city done
  if (parts.length === 3) return 3  // goal done
  return 4  // source done → complete
}

function isDay1Done(leadName: string): boolean {
  return leadName.includes('||source:')
}

export async function POST(req: Request) {
  try {
    const rawText = await req.text()
    let data: any = {}
    try { data = JSON.parse(rawText) } catch {}
    
    const msg = (data?.message || '').trim()
    const phone = data?.phone || ''
    if (!phone || !msg) return new Response(null, { status: 204 })

    const mLower = msg.toLowerCase().trim()

    // SILENT — diam total
    const silentWords = ['ok','oke','okay','oh','ohh','owh','ya udah','sip','noted','baik','baik2','bae','hmm','hm','he eh','yoi']
    if (silentWords.some(k => mLower === k || mLower.startsWith(k)))
      return new Response(null, { status: 204 })

    // STOP (harus sebelum delay — urgent)
    if (['stop','berhenti','cancel','batal','keluar'].some(k => mLower.includes(k)))
      return new Response('Kamu berhenti menerima broadcast. Ketik MULAI kapan saja untuk bergabung kembali')

    // Delay 4-8 detik — lebih cepat, aman dari timeout 10s
    await delay(4000 + Math.random() * 4000)

    // ─── Cek existing user via Notion ───
    const { page } = await notionFindByPhone(phone)
    
    if (page) {
      const leadName = page.properties?.['Lead Name']?.title?.[0]?.text?.content || ''
      
      // Sudah complete (||source:) → Day 1 mode
      if (isDay1Done(leadName)) {
        const ai = await aiRespond(msg, "User sudah selesai Day 1, menunggu Day 2.")
        if (ai) return new Response(ai)
        return new Response(`Halo Bunda! Besok jam 7 pagi kita lanjut Day 2 ya! Semangat! 🌸`)
      }

      // Sequential flow
      const step = detectStep(leadName)
      if (step < 4) {
        const handler = STEP_HANDLERS[step]
        return await handler(msg, phone, leadName, page.id) ?? new Response(null, { status: 204 })
      }
    }

    // ─── USER BARU ───
    const intentMauIkut = ['ya','iya','siap','mau','ikut','daftar','join','gabung','coba','tes','test',
      'tertarik','pingin','pengen','ingin','belajar','mulai','lanjut','saya mau','saya ingin','saya pengen',
      'mau dong','ayo','gas','yuk']
    
    if (intentMauIkut.some(k => mLower === k || mLower.startsWith(k) || mLower.includes(k))) {
      const pageId = await notionCreate(phone)
      return new Response('Senang sekali Bunda tertarik! 🌸\n\nSebelum mulai, saya mau kenalan dulu ya.\n\nSiapa nama lengkap Bunda?')
    }

    if (['hai','halo','hello','hi','hey','selamat','pagi','siang','sore','malam',
        'assalamualaikum','asslm'].some(k => mLower.includes(k))) {
      const pageId = await notionCreate(phone)
      return new Response(`Halo Bunda! 👋 Selamat datang di Komunitas Tumbuh Bersama.\n\nKami punya program 7 Hari Memulai Perubahan — GRATIS. Dirancang khusus untuk ibu-ibu hebat seperti Bunda.\n\nSebelum mulai, saya mau kenalan dulu ya.\n\nSiapa nama lengkap Bunda? 🌸`)
    }

    if (['tanya','help','bantu','info','faq','apa itu','bagaimana'].some(k => mLower.includes(k)))
      return new Response(faqMsg())

    // AI FIRST
    let userState = "User baru, belum kenal komunitas."
    if (page) {
      const leadName = page.properties?.['Lead Name']?.title?.[0]?.text?.content || ''
      if (isDay1Done(leadName)) userState = "User sudah selesai Day 1, menunggu Day 2."
      else if (leadName.includes('||')) userState = "User sedang isi data pendaftaran."
      else if (leadName.includes('—')) userState = "User sudah daftar, tahap awal."
    }

    const aiMsg = await aiRespond(msg, userState)
    if (aiMsg) return new Response(aiMsg)

    return new Response(`Halo Bunda! Selamat datang di Komunitas Tumbuh Bersama. Ada yang bisa dibantu? 😊`)
  } catch (e: any) {
    console.error('[WEBHOOK]', e.message)
    return new Response(null, { status: 204 })
  }
}

export async function GET() {
  return new Response('Webhook active')
}
