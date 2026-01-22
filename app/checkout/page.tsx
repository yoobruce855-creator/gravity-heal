'use client'

import { motion } from 'framer-motion'
import { CreditCard, Shield, Zap } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'
import Link from 'next/link'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export default function CheckoutPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleCheckout = async () => {
        setIsLoading(true)

        try {
            // Get analysis data from session storage
            const analysisResults = sessionStorage.getItem('analysisResults')
            if (!analysisResults) {
                alert('분석 결과를 찾을 수 없습니다. 다시 테스트해주세요.')
                return
            }

            // Create checkout session
            const response = await fetch('/api/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    analysisData: JSON.parse(analysisResults),
                }),
            })

            const { url } = await response.json()

            // Redirect to Stripe checkout
            if (url) {
                window.location.href = url
            }
        } catch (error) {
            console.error('Checkout error:', error)
            alert('결제 처리 중 오류가 발생했습니다.')
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-screen py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-display font-bold mb-4">
                        <span className="gradient-text">프리미엄 리포트</span>
                    </h1>
                    <p className="text-xl text-gray-300">
                        당신만을 위한 완전한 힐링 가이드
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-strong rounded-3xl p-8"
                    >
                        <h2 className="text-2xl font-display font-bold mb-6">포함 내용</h2>

                        <ul className="space-y-4">
                            {[
                                '10페이지 분량의 상세 분석 리포트',
                                '심층 감정 분석 및 해석',
                                '4주 단계별 힐링 플랜',
                                '상황별 맞춤 대처 전략',
                                '장기 성장 로드맵',
                                'PDF 다운로드 (평생 소장)',
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-6 h-6 bg-gradient-to-r from-gravity-500 to-heal-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-200">{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="mt-8 p-6 bg-gradient-to-r from-gravity-600/20 to-heal-600/20 rounded-2xl border border-gravity-500/30">
                            <div className="text-sm text-gray-400 mb-1">특별 할인가</div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold gradient-text">$9.99</span>
                                <span className="text-gray-500 line-through">$19.99</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Payment Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-strong rounded-3xl p-8"
                    >
                        <h2 className="text-2xl font-display font-bold mb-6">안전한 결제</h2>

                        <div className="space-y-6 mb-8">
                            {[
                                { icon: <Shield className="w-6 h-6" />, title: '보안 결제', desc: 'Stripe 보안 시스템' },
                                { icon: <Zap className="w-6 h-6" />, title: '즉시 전송', desc: '결제 후 바로 다운로드' },
                                { icon: <CreditCard className="w-6 h-6" />, title: '다양한 결제', desc: '모든 카드 지원' },
                            ].map((feature, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="text-heal-400 mt-1">{feature.icon}</div>
                                    <div>
                                        <div className="font-semibold mb-1">{feature.title}</div>
                                        <div className="text-sm text-gray-400">{feature.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className="w-full btn-primary text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? '처리 중...' : '결제하고 리포트 받기'}
                        </motion.button>

                        <div className="mt-4 text-center">
                            <Link href="/results" className="text-sm text-gray-400 hover:text-gray-300">
                                돌아가기
                            </Link>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-700 text-xs text-gray-400 text-center">
                            <p>안전한 결제는 Stripe를 통해 처리됩니다.</p>
                            <p className="mt-2">테스트 카드: 4242 4242 4242 4242</p>
                        </div>
                    </motion.div>
                </div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <p className="text-sm text-gray-400 mb-4">신뢰할 수 있는 서비스</p>
                    <div className="flex justify-center gap-8 text-gray-500">
                        <span>🔒 256-bit SSL</span>
                        <span>✓ PCI DSS</span>
                        <span>⭐ 4.9/5.0</span>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
