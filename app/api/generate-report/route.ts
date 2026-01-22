import { GoogleGenerativeAI } from '@google/generative-ai'
import { jsPDF } from 'jspdf'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
    try {
        const { analysisData, userAnswers } = await request.json()

        // Generate expanded content using Gemini
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const prompt = `
당신은 전문 심리 상담사이자 힐링 코치입니다. 다음 분석 데이터를 바탕으로 10페이지 분량의 상세한 개인 맞춤형 힐링 가이드를 작성해주세요:

기본 분석:
${JSON.stringify(analysisData, null, 2)}

사용자 답변:
${JSON.stringify(userAnswers, null, 2)}

다음 섹션들을 포함해주세요:

1. 심층 감정 분석 (2페이지): 각 감정 점수에 대한 상세 해석
2. 심리적 패턴 인사이트 (2페이지): 답변에서 드러난 패턴과 의미
3. 단계별 힐링 플랜 (3페이지): 
   - 1주차 활동
   - 2-4주차 활동
   - 장기 목표 설정
4. 맞춤형 대처 전략 (2페이지): 상황별 구체적 대응법
5. 지속적 성장을 위한 팁 (1페이지): 마음 건강 유지 방법

각 섹션을 명확히 구분하여 작성해주세요.
`

        const result = await model.generateContent(prompt)
        const fullReport = await result.response.text()

        // Create PDF
        const doc = new jsPDF()
        const pageWidth = doc.internal.pageSize.getWidth()
        const pageHeight = doc.internal.pageSize.getHeight()
        const margin = 20
        const maxWidth = pageWidth - 2 * margin

        // Title page
        doc.setFillColor(79, 70, 229) // Gravity color
        doc.rect(0, 0, pageWidth, 60, 'F')

        doc.setTextColor(255, 255, 255)
        doc.setFontSize(28)
        doc.text('Gravity Heal', margin, 30)

        doc.setFontSize(16)
        doc.text('개인 맞춤형 힐링 리포트', margin, 45)

        doc.setTextColor(0, 0, 0)
        doc.setFontSize(12)
        doc.text(`생성일: ${new Date().toLocaleDateString('ko-KR')}`, margin, 80)

        // Add content (simplified for example - in production, properly parse and format)
        const sections = fullReport.split('\n\n')
        let currentY = 100

        sections.forEach((section) => {
            if (currentY > pageHeight - margin) {
                doc.addPage()
                currentY = margin
            }

            const lines = doc.splitTextToSize(section, maxWidth)
            doc.text(lines, margin, currentY)
            currentY += lines.length * 7 + 10
        })

        // Convert to base64
        const pdfBase64 = doc.output('datauristring')

        return NextResponse.json({
            success: true,
            pdf: pdfBase64,
            filename: `gravity-heal-report-${Date.now()}.pdf`,
        })

    } catch (error) {
        console.error('PDF generation error:', error)
        return NextResponse.json(
            { error: 'PDF 생성 중 오류가 발생했습니다.' },
            { status: 500 }
        )
    }
}
