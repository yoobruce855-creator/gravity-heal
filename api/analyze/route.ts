import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
    try {
        const { answers } = await request.json()

        if (!answers || !Array.isArray(answers) || answers.length === 0) {
            return NextResponse.json(
                { error: '답변이 필요합니다.' },
                { status: 400 }
            )
        }

        // Check if API key is configured - if not, use demo data
        if (!process.env.GEMINI_API_KEY) {
            console.log('⚠️ DEMO MODE: Gemini API key not configured')

            // Analyze coping mechanisms for health concerns
            const copingMethod = answers[3]?.toLowerCase() || ''
            const unhealthyKeywords = ['술', '담배', '흡연', '음주', '알코올', '시가', '소주', '맥주', '와인', '술집']
            const hasUnhealthyCoping = unhealthyKeywords.some(keyword => copingMethod.includes(keyword))

            // Analyze overall emotional state
            const currentState = answers[0]?.toLowerCase() || ''
            const concerns = answers[1]?.toLowerCase() || ''
            const negativeKeywords = ['힘들', '우울', '불안', '스트레스', '피곤', '지쳐', '외로', '슬프', '화나', '답답']
            const hasNegativeState = negativeKeywords.some(keyword => currentState.includes(keyword) || concerns.includes(keyword))

            let encouragement = ''
            let insights = []
            let activities = []
            let stressScore = Math.floor(Math.random() * 20) + 45
            let anxietyScore = Math.floor(Math.random() * 20) + 40

            if (hasUnhealthyCoping) {
                // Provide health-conscious guidance for unhealthy coping
                encouragement = `당신의 솔직한 감정 표현에 감사드립니다. "${answers[3]}"으로 스트레스를 해소하고 계시는군요. 하지만 전문가로서 말씀드리자면, 이러한 방법은 단기적으로는 긴장을 풀어줄 수 있지만 장기적으로는 건강에 부정적인 영향을 미칠 수 있습니다. 더 건강하고 지속 가능한 대처 방법을 찾아보시는 것을 권장드립니다. "${answers[4]}"라는 말을 듣고 싶어하는 당신의 마음을 이해합니다. 변화는 작은 한 걸음부터 시작됩니다.`

                insights = [
                    '현재 사용하시는 스트레스 대처법이 건강에 해로울 수 있음을 인지하는 것이 중요합니다',
                    '단기적 해소보다 장기적 건강을 고려한 대안을 모색할 필요가 있습니다',
                    '전문가의 도움을 받아 건강한 대처 전략을 개발하는 것을 권장합니다',
                    '자신의 감정을 솔직하게 표현하는 용기는 긍정적인 첫걸음입니다'
                ]

                activities = [
                    '유산소 운동 (걷기, 조깅, 수영 등) - 스트레스 호르몬 감소에 효과적',
                    '심호흡 및 명상 - 즉각적인 긴장 완화에 도움',
                    '취미 활동이나 사회적 교류 - 건강한 방식의 스트레스 해소'
                ]

                stressScore = Math.floor(Math.random() * 15) + 60  // Higher stress
                anxietyScore = Math.floor(Math.random() * 15) + 55  // Higher anxiety
            } else {
                // Positive reinforcement for healthy coping
                encouragement = `당신의 솔직한 감정 표현은 매우 중요하고 소중합니다. "${answers[3]}"으로 스트레스에 대처하는 것은 건강한 방법입니다. 지금 이 순간 "${answers[4]}"라는 말을 듣고 싶어하는 당신의 마음을 진심으로 응원합니다. 작은 변화들이 모여 큰 성장을 만들어냅니다. 당신은 충분히 잘하고 있습니다. 힘든 순간에도 자신을 돌보려는 노력을 하고 있다는 것이 정말 대단합니다.`

                insights = [
                    '현재 상황을 있는 그대로 인정하는 용기를 가지고 계십니다',
                    '자신의 감정을 솔직하게 표현할 수 있는 능력이 있습니다',
                    '긍정적인 요소와 어려운 요소의 균형을 찾아가고 있습니다',
                    '자기 돌봄과 성장에 대한 의지가 강하게 느껴집니다'
                ]

                activities = [
                    '매일 아침 5분간 감사한 일 3가지 적어보기',
                    '주 3회 이상 20분 산책하며 자연 감상하기',
                    '좋아하는 음악을 들으며 5분 명상하기'
                ]
            }

            // Adjust scores based on emotional state
            let happinessScore = hasNegativeState ?
                Math.floor(Math.random() * 20) + 50 :
                Math.floor(Math.random() * 25) + 60

            return NextResponse.json({
                success: true,
                analysis: {
                    summary: `현재 "${answers[0]}"라는 마음 상태를 보이고 있으며, "${answers[1]}"에 대해 고민하고 계시네요. "${answers[2]}"에서 행복을 느끼는 긍정적인 면도 함께 있습니다.`,
                    encouragement: encouragement,
                    insights: insights,
                    activities: activities,
                    scores: {
                        happiness: happinessScore,
                        stress: stressScore,
                        anxiety: anxietyScore,
                        peace: Math.floor(Math.random() * 25) + 55,
                        hope: hasUnhealthyCoping ?
                            Math.floor(Math.random() * 20) + 55 :
                            Math.floor(Math.random() * 25) + 65,
                    },
                },
                timestamp: new Date().toISOString(),
                demoMode: true,
            })
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const prompt = `
당신은 전문 심리 상담사입니다. 다음은 사용자의 심리 테스트 답변입니다:

1. 현재 마음 상태: ${answers[0]}
2. 최근 고민/걱정: ${answers[1]}
3. 행복을 주는 것: ${answers[2]}
4. 스트레스 대처법: ${answers[3]}
5. 듣고 싶은 말: ${answers[4]}

다음 형식으로 분석 결과를 작성해주세요:

1. **감정 상태 요약**: 사용자의 현재 감정을 3줄로 요약
2. **격려 메시지**: 따뜻하고 공감적인 격려의 메시지 (5줄)
3. **핵심 인사이트**: 3-5개의 핵심 통찰 (각각 한 문장)
4. **추천 활동**: 3개의 구체적인 힐링 활동 제안
5. **감정 점수**: 다음 항목들을 0-100으로 평가
   - happiness (행복도)
   - stress (스트레스)
   - anxiety (불안도)
   - peace (평온도)
   - hope (희망도)

JSON 형식으로 응답해주세요.
`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        // Try to parse JSON from response
        let analysisData
        try {
            // Extract JSON from markdown code blocks if present
            const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/)
            const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text
            analysisData = JSON.parse(jsonText)
        } catch {
            // Fallback: parse manually
            analysisData = {
                summary: text.split('\n').slice(0, 3).join('\n'),
                encouragement: text.split('\n').slice(4, 9).join('\n'),
                insights: ['AI 분석이 진행되었습니다.', '당신의 마음을 이해합니다.', '긍정적인 변화를 응원합니다.'],
                activities: ['명상하기', '산책하기', '좋아하는 음악 듣기'],
                scores: {
                    happiness: 65,
                    stress: 55,
                    anxiety: 50,
                    peace: 60,
                    hope: 70,
                },
            }
        }

        return NextResponse.json({
            success: true,
            analysis: analysisData,
            timestamp: new Date().toISOString(),
        })

    } catch (error) {
        console.error('Gemini API Error:', error)
        return NextResponse.json(
            { error: 'AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
            { status: 500 }
        )
    }
}
