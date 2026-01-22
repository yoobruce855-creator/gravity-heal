'use client'

import { Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Download, Home } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function SuccessContent() {
    const searchParams = useSearchParams()
    const [isGenerating, setIsGenerating] = useState(true)
    const [pdfUrl, setPdfUrl] = useState<string>('')

    useEffect(() => {
        generatePDF()
    }, [])

    const generatePDF = async () => {
        try {
            const analysisResults = sessionStorage.getItem('analysisResults')
            const userAnswers = sessionStorage.getItem('userAnswers')

            const response = await fetch('/api/generate-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    analysisData: analysisResults ? JSON.parse(analysisResults) : {},
                    userAnswers: userAnswers ? JSON.parse(userAnswers) : [],
                }),
            })

            const data = await response.json()

            if (data.success) {
                setPdfUrl(data.pdf)
            }
        } catch (error) {
            console.error('PDF generation error:', error)
        } finally {
            setIsGenerating(false)
        }
    }

    const handleDownload = () => {
        if (pdfUrl) {
            const link = document.createElement('a')
            link.href = pdfUrl
            link.download = `gravity-heal-report-${Date.now()}.pdf`
            link.click()
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full glass-strong rounded-3xl p-12 text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                    <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
                </motion.div>

                <h1 className="text-4xl font-display font-bold mb-4">
                    <span className="gradient-text">결제 완료!</span>
                </h1>

                <p className="text-xl text-gray-300 mb-8">
                    프리미엄 힐링 리포트가 준비되었습니다
                </p>

                {isGenerating ? (
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-6 h-6 border-4 border-heal-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-gray-400">리포트 생성 중...</span>
                    </div>
                ) : (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownload}
                        className="btn-primary inline-flex items-center gap-2 mb-8"
                    >
                        <Download className="w-5 h-5" />
                        리포트 다운로드
                    </motion.button>
                )}

                <div className="border-t border-gray-700 pt-8 space-y-4">
                    <p className="text-sm text-gray-400">
                        리포트는 언제든지 다시 다운로드 가능합니다.
                    </p>

                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-secondary inline-flex items-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            홈으로 돌아가기
                        </motion.button>
                    </Link>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-gravity-600/20 to-heal-600/20 rounded-2xl">
                    <p className="text-sm text-gray-300">
                        💝 정기적으로 테스트를 받으면 마음 건강을 더 잘 관리할 수 있어요!
                    </p>
                </div>
            </motion.div>
        </main>
    )
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-heal-500 border-t-transparent rounded-full animate-spin" />
            </main>
        }>
            <SuccessContent />
        </Suspense>
    )
}
