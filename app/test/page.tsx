'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

const QUESTIONS = [
    '지금 이 순간, 당신의 마음 상태를 한 문장으로 표현한네마려면?',
    '최근에 가장 많이 생각하는 고민이나 걱정이 있나요?',
    '당신을 가장 행복하게 만드는 곃은 무엇인가요?',
    '스트레스를 받을 때 주로 어떻게 대처하시나요?',
    '마지막으로, 지금 가장 듣고 싶은 말이 있다면 무엇인가요?',
]

export default function TestPage() {
    const router = useRouter()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<string[]>([])
    const [currentAnswer, setCurrentAnswer] = useState('')
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: QUESTIONS[0] }
    ])
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!currentAnswer.trim() || isAnalyzing) return

        // Add user message
        const newAnswers = [...answers, currentAnswer]
        setAnswers(newAnswers)
        setMessages(prev => [...prev, { role: 'user', content: currentAnswer }])
        setCurrentAnswer('')

        // Check if we have more questions
        if (currentQuestion < QUESTIONS.length - 1) {
            // Move to next question
            setTimeout(() => {
                setCurrentQuestion(currentQuestion + 1)
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: QUESTIONS[currentQuestion + 1]
                }])
            }, 500)
        } else {
            // All questions answered, analyze
            setIsAnalyzing(true)
            try {
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ answers: newAnswers })
                })

                const data = await response.json()

                // Store results and navigate
                if (typeof window !== 'undefined') {
                    sessionStorage.setItem('analysisResults', JSON.stringify(data))
                    router.push('/results')
                }
            } catch (error) {
                console.error('Analysis error:', error)
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: '분석 중 오류가 발생했습니네. 다시 시도해주세요.'
                }])
                setIsAnalyzing(false)
            }
        }
    }

    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100

    return (
        <main className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="p-6 glass-strong border-b border-gray-800">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href="/">
                        <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <span>홈으로</span>
                        </button>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-heal-400" />
                        <span className="font-display font-semibold">Gravity Heal</span>
                    </div>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="w-full bg-gray-900 h-2">
                <motion.div
                    className="h-full bg-gradient-to-r from-gravity-600 to-heal-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            {/* Chat Container */}
            <div className="flex-1 overflow-y-auto px-4 py-8">
                <div className="max-w-3xl mx-auto space-y-6">
                    <AnimatePresence>
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-6 rounded-3xl ${message.role === 'user'
                                        ? 'bg-gradient-to-r from-gravity-600 to-heal-600 text-white'
                                        : 'glass-strong'
                                    }`}
                                >
                                    <p className="text-lg leading-relaxed">{message.content}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isAnalyzing && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                        >
                            <div className="glass-strong p-6 rounded-3xl flex items-center gap-4">
                                <Loader2 className="w-6 h-6 animate-spin text-heal-400" />
                                <p className="text-lg">AI가 당신의 마음을 분석하고 있습니다...</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Input Area */}
            {!isAnalyzing && (
                <div className="p-6 glass-strong border-t border-gray-800">
                    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                        <div className="flex gap-4">
                            <input
                                    type="text"
                                    value={currentAnswer}
                                    onChange={(e) => setCurrentAnswer(e.target.value)}
                                    placeholder="솔직하게 넵변해주세요..."
                                    className="flex-1 bg-gray-900/50 border border-gray-700 rounded-full px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-heal-500 focus:border-transparent"
                                    disabled={isAnalyzing}
                        </input>
                        <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={!currentAnswer.trim() || isAnalyzing}
                                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5" />
                            <span className="hidden sm:inline">전송</span>
                        </motion.button>
                    </div>

                    <div className="mt-4 text-sm text-gray-400 text-center">
                        질문 { currentQuestion + 1 } / { QUESTIONS.length }
                    </div>
                </form>
            </div>
            )}
        </main>
    )
}
