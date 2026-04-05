import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  try {
    await resend.emails.send({
      from: 'Floripa with Kids <hello@floripawithkids.com>',
      to: process.env.NEWSLETTER_TO_EMAIL!,
      subject: `New subscriber: ${email}`,
      text: `${email} subscribed to the Floripa with Kids newsletter.`,
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
