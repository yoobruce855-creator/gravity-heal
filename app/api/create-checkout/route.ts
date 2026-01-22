import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-02-24.acacia',
})

export async function POST(request: NextRequest) {
    try {
        const { analysisData } = await request.json()

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Gravity Heal 프리미엄 힐링 리포트',
                            description: '10페이지 분량의 AI 기반 개인 맞춤형 심리 분석 리포트',
                            images: ['https://via.placeholder.com/300'],
                        },
                        unit_amount: 999, // $9.99 in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/results`,
            metadata: {
                analysisData: JSON.stringify(analysisData),
            },
        })

        return NextResponse.json({ sessionId: session.id, url: session.url })
    } catch (error) {
        console.error('Stripe error:', error)
        return NextResponse.json(
            { error: '결제 세션 생성 중 오류가 발생했습니다.' },
            { status: 500 }
        )
    }
}
