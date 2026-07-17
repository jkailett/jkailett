import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    console.log('[WABLAS WEBHOOK] Received:', JSON.stringify(data, null, 2))

    // Extract message data from Wablas webhook
    const message = data?.message || data?.text || ''
    const phone = data?.phone || data?.from || ''
    const name = data?.name || ''
    const timestamp = data?.created_at || new Date().toISOString()

    console.log(`[WABLAS WEBHOOK] Phone: ${phone}, Message: ${message}`)

    // Handle keyword: YA = signup
    if (message.toUpperCase() === 'YA' && phone) {
      console.log('[WABLAS WEBHOOK] ✅ YA detected — saving to Notion...')

      const notionKey = process.env.NOTION_TOKEN
      if (!notionKey) {
        console.error('[WABLAS WEBHOOK] ❌ NOTION_TOKEN not set in env')
        return NextResponse.json({ status: false, error: 'NOTION_TOKEN not configured' }, { status: 500 })
      }
      const dbId = '39d95b591c4981acb7d7cff618972925'

      const payload = {
        parent: { database_id: dbId },
        properties: {
          'Lead Name': {
            title: [{ text: { content: `${phone} — ${name || 'N/A'}` } }]
          },
          'Day 1': { checkbox: true },
          'Completed': { checkbox: false },
          'Completion Rate': { number: 14.29 }
        }
      }

      const resp = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${notionKey}`,
          'Notion-Version': '2025-09-03',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const result = await resp.json()
      console.log(`[WABLAS WEBHOOK] Notion result: ${resp.status}`, JSON.stringify(result))

      if (resp.ok) {
        return NextResponse.json({ status: true, message: 'Signup saved to Notion' })
      } else {
        return NextResponse.json({ status: false, error: result.message }, { status: 500 })
      }
    }

    if (message.toUpperCase() === 'STOP' && phone) {
      console.log('[WABLAS WEBHOOK] ⏹️ STOP detected')
      // Optional: handle unsubscribe
    }

    return NextResponse.json({ status: true, message: 'Received' })
  } catch (error: any) {
    console.error('[WABLAS WEBHOOK] Error:', error.message)
    return NextResponse.json({ status: false, error: error.message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: true, message: 'Wablas Webhook endpoint is live' })
}