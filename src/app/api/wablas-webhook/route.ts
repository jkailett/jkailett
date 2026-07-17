// Wablas Webhook — menerima incoming message, membalas via response body
const WABLAS_TOKEN = 'Vn2UG8k2UJI1AuC8ptPC3YTqCb1HKCzCJGdWfkiBdYE2Yovczhbscn6'
const WABLAS_SECRET = 'HcU2B9tK'
const NOTION_DB_ID = '39d95b59-1c49-81ac-b7d7-cff618972925'
const NOTION_VER = '2022-06-28'

function welcome() {
  return "Halo Bunda! 👋 Selamat datang di 7-Hari Growth Challenge GRATIS!\n\nIkuti challenge ini untuk:\n✨ Mindset leadership yang kuat\n✨ Komunitas support & accountability\n✨ Earning potential yang nyata\n\nSiap mulai? 💪\n\nKetik: YA (untuk daftar)\nKetik: TANYA (untuk FAQ)"
}

function faq() {
  return "FAQ — 7-Hari Growth Challenge\n\n❓ Apa itu? Program 7 hari gratis fokus leadership.\n💰 Gratis 100%.\n👥 Join komunitas khusus member.\n\nKetik YA untuk daftar!"
}

async function notionQuery(phone: string) {
  const nt = process.env.NOTION_TOKEN || ''
  if (!nt) return null
  
  try {
    const resp = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB_ID}/query`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${nt}`, 'Notion-Version': NOTION_VER, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filter: { property: 'Lead Name', title: { contains: phone } }
      })
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
    if (!phone || !msg) return new Response('ok')
    
    const mLower = msg.toLowerCase().trim()

    // STOP
    if (['stop','berhenti','cancel','batal','keluar'].some(k => mLower.includes(k)))
      return new Response('Kamu berhenti menerima broadcast. Ketik MULAI kapan saja untuk bergabung kembali.')

    // HELP
    if (['tanya','help','bantu','info','faq','apa itu','bagaimana'].some(k => mLower.includes(k)))
      return new Response(faq())

    // YES — create Notion entry, ask name
    if (['ya','iya','y','yes','siap','oke','ok','okay','lanjut','mau'].some(k => mLower === k || mLower.startsWith(k))) {
      await notionCreate(phone, data?.pushName || '')
      return new Response('Siapa nama lengkap Bunda? 🌸')
    }

    // GREETINGS
    if (['hai','halo','hello','hi','hey','selamat','pagi','siang','sore','malam',
        'assalamualaikum','asslm','mulai','join','gabung','daftar','coba','tes','test'].some(k => mLower.includes(k)))
      return new Response(welcome())

    // ANYTHING ELSE — check Notion for progress
    const page = await notionQuery(phone)
    if (!page) return new Response(welcome())

    const props = page.properties || {}
    const leadName = props['Lead Name']?.title?.[0]?.text?.content || ''
    const day1Done = props['Day 1']?.checkbox === true
    
    if (day1Done) return new Response(`Halo lagi! Day 1 sudah dikirim. Besok jam 7 pagi kita lanjut Day 2 ya 🌸`)

    const parts = leadName.split('||')
    
    if (parts.length === 1 && !leadName.includes('—')) {
      // Step 0: No name
      const newName = `${phone} — ${msg}`
      await notionUpdate(page.id, { properties: { 'Lead Name': { title: [{ text: { content: newName } }] } } })
      return new Response('Dari kota mana, Bunda? 🏙️')
    }
    
    if (parts.length === 1) {
      // Step 1: Has name, need city
      const updated = `${leadName} || city: ${msg}`
      await notionUpdate(page.id, { properties: { 'Lead Name': { title: [{ text: { content: updated } }] } } })
      return new Response('Apa tujuan Bunda ikut challenge ini? 🎯')
    }
    
    if (parts.length === 2) {
      // Step 2: Has name+city, need goal
      const updated = `${leadName} || goal: ${msg}`
      await notionUpdate(page.id, { properties: { 'Lead Name': { title: [{ text: { content: updated } }] } } })
      return new Response('Darimana Bunda tahu GrowWithIka? 📱')
    }
    
    if (parts.length === 3) {
      // Step 3: Has goal, need source — complete
      const updated = `${leadName} || source: ${msg}`
      await notionUpdate(page.id, {
        properties: { 'Lead Name': { title: [{ text: { content: updated } }] }, 'Day 1': { checkbox: true }, 'Completion Rate': { number: 14.29 } }
      })
      return new Response(`🎉 Terima kasih! Data sudah lengkap.\n\n📚 Day 1: Bangun Mentalitas Bertumbuh\n✅ Tulis 3 hal yang disyukuri\n✅ Set 1 goal kecil\n✅ Baca refleksi mindset\n\nBesok jam 7 pagi kita lanjut Day 2! 🚀`)
    }

    return new Response(welcome())
  } catch (e: any) {
    console.error('[WEBHOOK]', e.message)
    return new Response('Maaf ada kesalahan. Silakan coba lagi')
  }
}

export async function GET() {
  return new Response('Webhook active')
}