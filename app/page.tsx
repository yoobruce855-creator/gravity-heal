'use client'

import { motion } from 'framer-motion'
import { Sparkles, Brain, Heart, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import FloatingElements from '@/components/FloatingElements'

export default function HomePage() {
    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Background floating elements */}
            <FloatingElements />

            {/* Hero Section */}
            <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-5xl mx-auto"
                >
                    {/* Logo/Badge */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full mb-8"
                    >
                        <Sparkles className="w-5 h-5 text-heal-400" />
                        <span className="text-sm font-medium">2026 최첨단 AI 심리 분석</span>
                    </motion.div>

                    {/* Main Heading */}
                    <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 leading-tight">
                        <span className="gradient-text">Gravity Heal</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
                        당신의 마음을 이해하는 AI 테라피
                    </p>

                    <p className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                        Google Gemini 3 AI가 당신의 감정을 분석하고,<br />
                        개인 맞춤형 힐링 솔루션을 제공합니다
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/test">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary group flex items-center gap-2"
                            >
                                무료 심리 테스트 시작
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-secondary"
                        >
                            서비스 소개 보기
                        </motion.button>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
                >
                    {[
                        { number: '10K+', label: '분석 완료' },
                        { number: '98%', label: '만족도' },
                        { number: '24/7', label: 'AI 지원' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                                {stat.number}
                            </div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold text-center mb-16"
                    >
                        <span className="gradient-text">왜 Gravity Heal인가?</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Brain className="w-12 h-12" />,
                                title: 'AI 기반 분석',
                                description: 'Google Gemini 3 AI가 당신의 감정과 생각을 깊이 있게 분석합니다',
                            },
                            {
                                icon: <Heart className="w-12 h-12" />,
                                title: '개인 맞춤형 솔루션',
                                description: '당신만을 위한 맞춤형 힐링 가이드와 실천 방법을 제공합니다',
                            },
                            {
                                icon: <TrendingUp className="w-12 h-12" />,
                                title: '지속적인 성장',
                                description: '정기적인 분석으로 당신의 마음 건강 개선 과정을 추적합니다',
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ y: -10 }}
                                className="glass rounded-3xl p-8 card-hover"
                            >
                                <div className="text-heal-400 mb-4">{feature.icon}</div>
                                <h3 className="text-2xl font-display font-semibold mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="relative z-10 py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold text-center mb-16"
                    >
                        <span className="gradient-text">간단한 3단계</span>
                    </motion.h2>

                    <div className="space-y-8">
                        {[
                            { step: '01', title: '질문에 답변하기', desc: '당신의 현재 감정과 고민을 자유롭게 입력하세요' },
                            { step: '02', title: 'AI 분석 받기', desc: 'Gemini AI가 실시간으로 당신의 마음을 분석합니다' },
                            { step: '03', title: '맞춤 리포트 받기', desc: '개인화된 힐링 가이드 PDF를 다운로드하세요' },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="flex items-center gap-6 glass-strong rounded-2xl p-6"
                            >
                                <div className="text-5xl font-display font-bold gradient-text flex-shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-gray-300">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/test">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary"
                            >
                                지금 바로 시작하기
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 px-4 border-t border-gray-800">
                <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
                    <p>© 2026 Gravity Heal. Powered by Google Gemini 3 AI.</p>
                    <p className="mt-2">당신의 마음 건강을 위한 AI 파트너</p>
                </div>
            </footer>
        </main>
    )
}
