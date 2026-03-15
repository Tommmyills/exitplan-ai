import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-06-20',
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sessionId } = body

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'ExitPlan AI – Full Relocation Plan',
              description: 'Unlock detailed visa steps, housing sites, neighborhood picks, tax guide, healthcare setup & 90-day checklist',
              images: [],
            },
            unit_amount: 1900, // $19.00
          },
          quantity: 1,
        },
      ],
      metadata: {
        sessionId: sessionId || '',
      },
      success_url: `${baseUrl}/results?session=${sessionId}&upgraded=true`,
      cancel_url: `${baseUrl}/results?session=${sessionId}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
