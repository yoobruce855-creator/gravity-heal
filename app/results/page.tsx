'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Home, TrendingUp, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import FallingCard from '@/components/FallingCard'

interface AnalysisData {
    summary: string
    encouragement: string
    insights: string[]
    activities: string[]
    scores: {
        happiness: number
        stress: number
        anxiety: number
        peace: number
        hope: number
    }
}

export default function ResultsPage() {
    const router = useRouter()
    const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
    const [showCards, setShowCards] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = sessionStorage.getItem('analysisResults')
            if (stored) {
                const data = JSON.parse(stored)
                setAnalysisData(data.analysis)
                // Start card animation after a brief delay
                setTimeout(() => setShowCards(true), 500)
            } else {
                router.push('/test')
            }
        }
    }, [router])

    if (!analysisData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading glass p-8 rounded-3xl">
                    <p className="text-xl">결과를 불러오는 중...</p>
                </div>
            </div>
        )
    }

    const emotionColors = {
        happiness: 'from-yellow-400 to-orange-500',
        stress: 'from-red-400 to-pink-500',
        anxiety: 'from-purple-400 to-indigo-500',
        peace: 'from-green-400 to-teal-500',
        hope: 'from-blue-400 to-cyan-500',
    }

    const emotionLabels = {
        happiness: '행복도',
        stress: '스트레스',
        anxiety: '불안도',
        peace: '평온도',
        hope: '희망도',
    }

    return (
        <main className="min-h-screen pb-20">
            {/* Header */}
            <header className="p-6 glass-strong border-b border-gray-800">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-heal-400" />
                        <span className="text-2xl font-display font-bold gradient-text">
                            분석 완료!
                        </span>
                    </div>

                    <Link href="/">
                        <button className="flex items-center gap-2 btn-secondary py-2 px-4 text-sm">
                            <Home className="w-4 h-4" />
                            홈으로
                        </button>
                    </Link>
                </div>
            </header>

            {/* Results Container */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Emotional Scores - Top Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-display font-bold mb-8 text-center">
                        <span className="gradient-text">감정 분석 결과</span>
                    </h2>

                    <div className="grid md:grid-cols-5 gap-4">
                        {Object.entries(analysisData.scores).map(([key, value], index) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-strong rounded-2xl p-6 text-center"
                            >
                                <div className="text-sm text-gray-400 mb-2">
                                    {emotionLabels[key as keyof typeof emotionLabels]}
                                </div>
                                <div className={`text-4xl font-bold bg-gradient-to-r ${emotionColors[key as keyof typeof emotionColors]} bg-clip-text text-transparent mb-3`}>
                                    {value}
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <motion.div
                                        className={`h-full rounded-full bg-gradient-to-r ${emotionColors[key as keyof typeof emotionColors]}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${value}%` }}
                                        transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Cards Grid Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-display font-bold mb-8 text-center">
                        <span className="gradient-text">당신을 위한 인사이트</span>
                    </h2>

                    {showCards && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Summary Card */}
                            <FallingCard delay={0} index={0}>
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-3 text-heal-400">
                                        감정 상태 요약
                                    </h3>
                                    <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-line">
                                        {analysisData.summary}
                                    </p>
                                </div>
                            </FallingCard>

                            {/* Encouragement Card */}
                            <FallingCard delay={0.1} index={1}>
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-3 text-gravity-400">
                                        당신에게 전하는 메시지
                                    </h3>
                                    <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-line">
                                        {analysisData.encouragement}
                                    </p>
                                </div>
                            </FallingCard>

                            {/* Insights Cards */}
                            {analysisData.insights.map((insight, index) => (
                                <FallingCard key={index} delay={0.2 + index * 0.1} index={2 + index}>
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-heal-500 to-gravity-500 rounded-full flex items-center justify-center text-sm font-bold">
                                            {index + 1}
                                        </div>
                                        <p className="text-gray-200 text-sm flex-1">{insight}</p>
                                    </div>
                                </FallingCard>
                            ))}

                            {/* Activities Card */}
                            <FallingCard delay={0.2 + analysisData.insights.length * 0.1} index={2 + analysisData.insights.length}>
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-center gradient-text">
                                        추천 힐링 활동
                                    </h3>
                                    <ul className="space-y-2">
                                        {analysisData.activities.map((activity, index) => (
                                            <li key={index} className="flex items-center gap-3 text-gray-200 text-sm">
                                                <div className="w-2 h-2 bg-heal-400 rounded-full flex-shrink-0" />
                                                {activity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FallingCard>
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3 }}
                    className="mt-16 text-center"
                >
                    <div className="glass-strong rounded-3xl p-8 max-w-2xl mx-auto">
                        <TrendingUp className="w-16 h-16 text-heal-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-display font-bold mb-4">
                            더 깊은 분석이 필요하신가요?
                        </h3>
                        <p className="text-gray-300 mb-6">
                            10페이지 분량의 상세한 개인 맞춤형 힐링 가이드를 받아보세요.<br />
                            구체적인 실천 방법과 장기 계획이 포함되어 있습니다.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/checkout">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-primary flex items-center gap-2"
                                >
                                    <Download className="w-5 h-5" />
                                    프리미엄 리포트 구매 ($9.99)
                                </motion.button>
                            </Link>

                            <Link href="/test">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-secondary"
                                >
                                    다시 테스트하기
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
