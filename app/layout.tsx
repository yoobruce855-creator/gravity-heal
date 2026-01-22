import './globals.css'
import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
    title: 'Gravity Heal | AI 심리 테라피 & 맞춤 리포트',
    description: '당신의 마음을 이해하는 AI 기반 심리 분석 서비스. 개인 맞춤형 힐링 리포트를 받아보세요.',
    keywords: ['AI 심리상담', '마음 치유', '감정 분석', '개인 맞춤 리포트', '힐링'],
    authors: [{ name: 'Gravity Heal' }],
    openGraph: {
        title: 'Gravity Heal | AI 심리 테라피',
        description: '당신의 마음을 이해하는 AI 분석',
        type: 'website',
    },
    viewport: 'width=device-width, initial-scale=1',
    themeColor: '#4f46e5',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    )
}
