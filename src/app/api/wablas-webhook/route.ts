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
    
    console.log('[AI] Calling DeepSeek with key length:', key.length)
    
    const systemPrompt = `Kamu adalah Admin Komunitas Tumbuh Bersama — asisten Ika Irawati.

IDENTITAS:
- Kamu BUKAN AI bot — kamu bagian dari tim Komunitas
- Bicara comme sesama ibu, pakai "Bunda"
- Hangat, santai, gak jualan, gak pressure
- Boleh ceplas-ceplos kayak teman ngobrol

PANDUAN JAWAB:
- Jawab PERTANYAAN user secara langsung dulu, baru arahkan ke program
- Contoh: user tanya "caranya submit tugas?" → jawab dulu caranya, baru kalau relevan arahkan
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

async function notionQuery(phone: string) {
  const nt = process.env.NOTION_TOKEN || ''
  if (!nt) return null
  try {
    const resp = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB_ID}/query`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${nt}`, 'Notion-Version': NOTION_VER, 'Content-Type': 'application/json' },
      body: JSON.stringify({ filter: { property: 'Lead Name', title: { contains: phone } } })
    })
    const json = await resp.json()
    return json.results?.[0] || null
  } catch(e) { return null }
}

async function notionCreate(phone: string, name: string) {
  const nt = process.env.NOTION_TOKEN || ''
  if (!nt) return
  try {
    await fetch('https://api.notion.com/v1/pages', {
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
  } catch(e) {}
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

export async function POST(req: Request) {
  try {
    const rawText = await req.text()
    let data: any = {}
    try { data = JSON.parse(rawText) } catch {}
    
    const msg = (data?.message || '').trim()
    const phone = data?.phone || ''
    if (!phone || !msg) return new Response(null, { status: 204 })

    const mLower = msg.toLowerCase().trim()

    // SILENT — diam total, no delay
    const silentWords = ['ok','oke','okay','oh','ohh','owh','ya udah','sip','noted','baik','baik2','bae','hmm','hm','he eh','yoi']
    if (silentWords.some(k => mLower === k || mLower.startsWith(k)))
      return new Response(null, { status: 204 })

    // Delay 8-15 detik — lebih responsif
    await delay(8000 + Math.random() * 7000)

    // Cek Notion — user existing atau baru
    const page = await notionQuery(phone)

    // === USER EXISTING: sequential flow (data CRM) ===
    if (page) {
      const props = page.properties || {}
      const leadName = props['Lead Name']?.title?.[0]?.text?.content || ''
      const day1Done = props['Day 1']?.checkbox === true
      
      if (day1Done) {
        // Day 1 selesai → AI handle natural
        const ai = await aiRespond(msg, "User sudah selesai Day 1, menunggu Day 2.")
        if (ai) return new Response(ai)
        return new Response(`Halo Bunda! Besok jam 7 pagi kita lanjut Day 2 ya! Semangat! 🌸`)
      }

      const parts = leadName.split('||')
      
      // Data CRM: name → city → goal → source (dengan validasi emosi)
      if (parts.length === 1 && !leadName.includes('—')) {
        const newName = `${phone} — ${msg}`
        await notionUpdate(page.id, { properties: { 'Lead Name': { title: [{ text: { content: newName } }] } } })
        const nama = msg.split(' ')[0]
        return new Response(`Senang berkenalan, ${nama}! 🌸 Nama yang cantik.\n\nBunda tinggal di kota mana?`)
      }
      if (parts.length === 1) {
        const upd = `${leadName} || city: ${msg}`
        await notionUpdate(page.id, { properties: { 'Lead Name': { title: [{ text: { content: upd } }] } } })
        return new Response(`Wah, pasti kota yang indah! 🌸\n\nBoleh cerita, apa yang membuat Bunda tertarik ikut challenge ini? Tujuannya apa?`)
      }
      if (parts.length === 2) {
        const upd = `${leadName} || goal: ${msg}`
        await notionUpdate(page.id, { properties: { 'Lead Name': { title: [{ text: { content: upd } }] } } })
        return new Response(`Wah, itu keren banget Bunda! 👏 Saya bisa rasain semangatnya dari sini.\n\nTujuan seperti itu sejalan banget dengan visi komunitas kita. Saya yakin Bunda bisa mencapai itu.\n\nBunda kenal Komunitas Tumbuh Bersama dari mana? IG, TikTok, atau dari teman?`) 
      }
      if (parts.length === 3) {
        const upd = `${leadName} || source: ${msg}`
        await notionUpdate(page.id, { properties: { 'Lead Name': { title: [{ text: { content: upd } }] }, 'Day 1': { checkbox: true }, 'Completion Rate': { number: 14.29 } } })
        return new Response(`🎉 Terima kasih Bunda! Sekarang Bunda resmi bergabung di 7 Hari Memulai Perubahan.\n\nLangkah pertama adalah yang terberat, dan Bunda sudah melakukannya. Saya bangga! 👏\n\n📚 *Day 1: Mulai dari Dalam* — bersama Ika Irawati\n✅ Tulis 2 hal yang disyukuri hari ini\n✅ Tulis 1 keterampilan baru yang ingin Bunda kuasai\n✅ Balas: *Saya Siap Bertumbuh*\n\nKerjakan dulu ya Bunda, santai aja. Besok kita lanjut Day 2! 🚀`)
      }
    }

    // === USER BARU: langsung data collection tanpa "ketik YA" ===
    // Deteksi intent: greeting, mau ikut, tertarik, daftar, coba
    const intentMauIkut = ['ya','iya','siap','mau','ikut','daftar','join','gabung','coba','tes','test',
      'tertarik','pingin','pengen','ingin','belajar','mulai','lanjut','saya mau','saya ingin','saya pengen',
      'mau dong','ayo','gas','yuk']
    
    if (intentMauIkut.some(k => mLower === k || mLower.startsWith(k) || mLower.includes(k))) {
      await notionCreate(phone, data?.pushName || '')
      return new Response('Senang sekali Bunda tertarik! 🌸\n\nSebelum mulai, saya mau kenalan dulu ya.\n\nSiapa nama lengkap Bunda?')
    }

    // GREETINGS — welcome + langsung tanya nama
    if (['hai','halo','hello','hi','hey','selamat','pagi','siang','sore','malam',
        'assalamualaikum','asslm'].some(k => mLower.includes(k))) {
      await notionCreate(phone, data?.pushName || '')
      return new Response(`Halo Bunda! 👋 Selamat datang di Komunitas Tumbuh Bersama.\n\nKami punya program 7 Hari Memulai Perubahan — GRATIS. Dirancang khusus untuk ibu-ibu hebat seperti Bunda.\n\nSebelum mulai, saya mau kenalan dulu ya.\n\nSiapa nama lengkap Bunda? 🌸`)
    }

    // STOP
    if (['stop','berhenti','cancel','batal','keluar'].some(k => mLower.includes(k)))
      return new Response('Kamu berhenti menerima broadcast. Ketik MULAI kapan saja untuk bergabung kembali')

    // HELP
    if (['tanya','help','bantu','info','faq','apa itu','bagaimana'].some(k => mLower.includes(k)))
      return new Response(faqMsg())

    // AI FIRST — untuk semua yg belum match, dengan context lebih detail
    let chatHistory = ''
    let userState = "User baru, belum kenal komunitas."
    
    if (page) {
      const notes = page.properties?.['Notes']?.rich_text?.[0]?.text?.content || ''
      if (notes) chatHistory = `\n\nRiwayat chat:\n${notes}`
      
      const p = page.properties || {}
      const leadName = p['Lead Name']?.title?.[0]?.text?.content || ''
      const day1Done = p['Day 1']?.checkbox === true
      
      if (day1Done) userState = "User sudah selesai Day 1, menunggu Day 2. Boleh jawab pertanyaan seputar program."
      else if (leadName.includes('||source:')) userState = "User baru isi data lengkap, siap mulai Day 1."
      else if (leadName.includes('||')) userState = "User sedang isi data pendaftaran."
      else userState = "User sudah daftar, tahap awal."
    }

    const aiMsg = await aiRespond(msg, `${userState}${chatHistory}`)
    if (aiMsg) {
      if (page) {
        const notes = page.properties?.['Notes']?.rich_text?.[0]?.text?.content || ''
        const updated = (notes ? notes + '\n' : '') + `[Q: ${msg}] [A: ${aiMsg}]`
        const trimmed = updated.length > 1900 ? updated.slice(-1900) : updated
        notionUpdate(page.id, { properties: { 'Notes': { rich_text: [{ text: { content: trimmed } }] } } }).catch(() => {})
      }
      return new Response(aiMsg)
    }

    // Final fallback
    return new Response(`Halo Bunda! Selamat datang di Komunitas Tumbuh Bersama. Ada yang bisa dibantu? 😊`)
  } catch (e: any) {
    console.error('[WEBHOOK]', e.message)
    return new Response(null, { status: 204 })
  }
}

export async function GET() {
  return new Response('Webhook active')
}