// Wablas Webhook — response body = balasan ke user. Silent = 204 No Content
const WABLAS_TOKEN = 'Vn2UG8k2UJI1AuC8ptPC3YTqCb1HKCzCJGdWfkiBdYE2Yovczhbscn6'
const WABLAS_SECRET = 'HcU2B9tK'
const NOTION_DB_ID = '39d95b59-1c49-81ac-b7d7-cff618972925'
const NOTION_VER = '2022-06-28'

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

function welcome() { return "Halo Bunda! 👋 Selamat datang di 7-Hari Growth Challenge GRATIS!\n\nIkuti challenge ini untuk:\n✨ Mindset leadership yg kuat\n✨ Komunitas support & accountability\n✨ Earning potential nyata\n\nSiap mulai? 💪\n\nKetik: YA (daftar)\nKetik: TANYA (FAQ)" }

function faqMsg() { return "FAQ — 7-Hari Growth Challenge\n\n❓ Apa itu? Program 7 hari gratis fokus leadership.\n💰 Gratis 100%.\n👥 Join komunitas khusus member.\n\nKetik YA untuk daftar!" }

async function aiRespond(msg: string, context: string): Promise<string | null> {
  try {
    const key = process.env.DEEPSEEK_API_KEY || ''
    if (!key || key.length < 10) return null
    
    console.log('[AI] Calling DeepSeek with key length:', key.length)
    
    const systemPrompt = `Kamu adalah Ren, asisten pribadi Ika Irawati di GrowWithIka.

🏆 IDENTITAS:
- Kamu BUKAN AI bot — kamu bagian dari tim GrowWithIka
- Bicara comme sesama ibu, pakai "Bunda"
- JANGAN pernah bilang "saya AI" atau "saya bot"
- Hangat, supportif, gak pressure, gak jualan keras

📋 PRIORITAS JAWABAN:
1. Arahkan ke 7-Hari Challenge GRATIS
2. Info program & FAQ
3. Jawab pertanyaan umum (leadership, Atomy, komunitas)
4. Kalau di luar konteks → arahkan ke challenge

🚫 LARANGAN:
- Jangan kasih janji penghasilan pasti
- Jangan pressure "gabung dulu"
- Jangan bahas politik/agama/SARA
- Jangan saran kesehatan/medis
- Jangan janjiin hasil tertentu

🎯 OBJEKSI:
"MLM?" → "Level 1-2 growth only. Level 3 Atomy opsional."
"Rekrut?" → "Level 1-2 self-growth. Level 3 kalau mau aja."
"Modal?" → "Level 1 gratis. Level 2 Rp499k. Level 3 mulai Rp300k."
"Sibuk?" → "15-30 menit/hari via WA. Desain untuk ibu sibuk."

🎯 RESPONS POSITIF:
"Mau daftar" → Arahkan ketik YA
"Tertarik" → "Ketik YA untuk mulai 7-Hari gratis, Bunda!"
"Info lanjut" → "Ketik TANYA untuk FAQ"

⏰ USER STATE: ${context}

Jawab alami, ramah, maks 200 karakter. Jangan judge atau pressure.`

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
          'Lead Name': { title: [{ text: { content: `${phone} — ${name}` } }] },
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

    // Delay 20-35 detik biar natural kayak manusia ngetik
    await delay(20000 + Math.random() * 15000)

    // STOP
    if (['stop','berhenti','cancel','batal','keluar'].some(k => mLower.includes(k)))
      return new Response('Kamu berhenti menerima broadcast. Ketik MULAI kapan saja untuk bergabung kembali.')

    // HELP
    if (['tanya','help','bantu','info','faq','apa itu','bagaimana'].some(k => mLower.includes(k)))
      return new Response(faqMsg())

    // YES
    if (['ya','iya','siap','oke','lanjut','mau dong'].some(k => mLower === k || mLower.startsWith(k))) {
      await notionCreate(phone, data?.pushName || '')
      return new Response('Siapa nama lengkap Bunda? 🌸')
    }

    // GREETINGS
    if (['hai','halo','hello','hi','hey','selamat','pagi','siang','sore','malam','assalamualaikum','asslm','mulai','join','gabung','daftar','coba','tes','test'].some(k => mLower.includes(k)))
      return new Response(welcome())

    // ANYTHING ELSE — cek Notion dulu (sequential flow), lalu AI fallback
    const page = await notionQuery(phone)
    
    if (page) {
      const props = page.properties || {}
      const leadName = props['Lead Name']?.title?.[0]?.text?.content || ''
      const day1Done = props['Day 1']?.checkbox === true
      
      if (day1Done) {
        // Already completed Day 1 — AI bisa jawab natural
        const ai = await aiRespond(msg, "User sudah selesai Day 1, menunggu Day 2.")
        if (ai) return new Response(ai)
        return new Response(`Halo lagi! Day 1 sudah dikirim. Besok jam 7 pagi lanjut Day 2 ya 🌸`)
      }

      const parts = leadName.split('||')
      
      // Sequential flow: collect name → city → goal → source
      if (parts.length === 1 && !leadName.includes('—')) {
        const newName = `${phone} — ${msg}`
        await notionUpdate(page.id, { properties: { 'Lead Name': { title: [{ text: { content: newName } }] } } })
        return new Response('Dari kota mana, Bunda? 🏙️')
      }
      
      if (parts.length === 1) {
        const updated = `${leadName} || city: ${msg}`
        await notionUpdate(page.id, { properties: { 'Lead Name': { title: [{ text: { content: updated } }] } } })
        return new Response('Apa tujuan Bunda ikut challenge ini? 🎯')
      }
      
      if (parts.length === 2) {
        const updated = `${leadName} || goal: ${msg}`
        await notionUpdate(page.id, { properties: { 'Lead Name': { title: [{ text: { content: updated } }] } } })
        return new Response('Darimana Bunda tahu GrowWithIka? 📱')
      }
      
      if (parts.length === 3) {
        const updated = `${leadName} || source: ${msg}`
        await notionUpdate(page.id, { properties: { 'Lead Name': { title: [{ text: { content: updated } }] }, 'Day 1': { checkbox: true }, 'Completion Rate': { number: 14.29 } } })
        return new Response(`🎉 Terima kasih! Data sudah lengkap.\n\n📚 Day 1: Bangun Mentalitas Bertumbuh\n✅ Tulis 3 hal yg disyukuri\n✅ Set 1 goal kecil\n✅ Baca refleksi mindset\n\nBesok jam 7 pagi lanjut Day 2! 🚀`)
      }
    }

    // AI fallback untuk pertanyaan umum
    const aiText = await aiRespond(msg, page ? "User sudah terdaftar." : "User baru, belum kenal.")
    if (aiText) return new Response(aiText)
    
    return new Response(`Halo Bunda! 👋 Selamat datang! Ketik YA untuk mulai 7-Hari Challenge gratis, atau TANYA untuk FAQ.`)
  } catch (e: any) {
    console.error('[WEBHOOK]', e.message)
    return new Response(null, { status: 204 })
  }
}

export async function GET() {
  return new Response('Webhook active')
}