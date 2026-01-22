# Gravity Heal (그래비티 힐) 🌌

> AI 기반 심리 테라피 & 맞춤형 힐링 리포트 판매 플랫폼

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![Gemini](https://img.shields.io/badge/Gemini-3_Flash-4285f4?logo=google)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635bff?logo=stripe)

## ✨ 프로젝트 소개

**Gravity Heal**은 Google Gemini 3 AI를 활용한 최첨단 심리 분석 서비스입니다. 사용자의 감정을 실시간으로 분석하고, 물리 엔진 기반의 화려한 UI로 결과를 시각화하며, 프리미엄 PDF 리포트로 수익화하는 완전한 비즈니스 플랫폼입니다.

### 🎯 핵심 기능

- 🧠 **AI 심리 분석**: Gemini 3 Flash API를 통한 실시간 감정 분석
- 🎨 **물리 기반 UI**: Framer Motion을 활용한 중력 효과 애니메이션
- 📊 **시각적 결과**: 떨어지는 카드 효과로 인사이트 표시
- 💳 **결제 시스템**: Stripe 통합으로 프리미엄 리포트 판매
- 📄 **PDF 생성**: jsPDF로 10페이지 맞춤형 힐링 가이드 자동 생성
- 🌙 **다크 모드**: 프리미엄 느낌의 글래스모피즘 디자인

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn
- Gemini API Key ([발급 받기](https://makersuite.google.com/app/apikey))
- Stripe API Keys ([발급 받기](https://dashboard.stripe.com/apikeys))

### 설치 방법

1. **프로젝트 디렉토리로 이동**

```bash
cd c:\Users\home\.gemini\new_project\gravity-heal
```

2. **의존성 설치**

```bash
npm install
```

3. **환경 변수 설정**

`.env.local` 파일을 열고 API 키를 입력하세요:

```env
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **개발 서버 실행**

```bash
npm run dev
```

5. **브라우저에서 열기**

http://localhost:3000 접속

## 📁 프로젝트 구조

```
gravity-heal/
├── app/
│   ├── page.tsx              # 랜딩 페이지
│   ├── test/
│   │   └── page.tsx          # AI 심리 테스트
│   ├── results/
│   │   └── page.tsx          # 결과 페이지 (떨어지는 카드)
│   ├── checkout/
│   │   └── page.tsx          # 결제 페이지
│   ├── success/
│   │   └── page.tsx          # 구매 완료 & PDF 다운로드
│   ├── api/
│   │   ├── analyze/
│   │   │   └── route.ts      # Gemini AI 분석 API
│   │   ├── create-checkout/
│   │   │   └── route.ts      # Stripe 결제 세션 생성
│   │   └── generate-report/
│   │       └── route.ts      # PDF 리포트 생성
│   ├── layout.tsx            # 루트 레이아웃
│   └── globals.css           # 글로벌 스타일
├── components/
│   ├── FloatingElements.tsx  # 배경 파티클 애니메이션
│   └── FallingCard.tsx       # 물리 기반 카드 컴포넌트
├── .env.local                # 환경 변수 (Git 제외)
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 주요 기술 스택

### Frontend
- **Next.js 14** - App Router, Server Components
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 기반 스타일링
- **Framer Motion** - 물리 기반 애니메이션

### Backend & AI
- **Google Gemini 3 Flash** - AI 심리 분석
- **Next.js API Routes** - 서버리스 API
- **Stripe** - 결제 처리
- **jsPDF** - PDF 문서 생성

### Design System
- **Glassmorphism** - 매력적인 UI
- **Custom Gradients** - 브랜드 아이덴티티
- **Google Fonts** - Inter, Outfit

## 💰 수익화 전략

1. **프리미엄 PDF 리포트**: $9.99
   - 10페이지 맞춤형 분석
   - AI 생성 힐링 플랜
   - 평생 소장 가능

2. **추가 수익 기회**:
   - 구독 서비스 (월간 리포트)
   - 기업 B2B 패키지
   - 광고 수익 (무료 버전)

## 🧪 테스트 방법

### Stripe 테스트 모드

결제 테스트 시 다음 카드 번호 사용:

```
카드 번호: 4242 4242 4242 4242
만료일: 임의의 미래 날짜
CVC: 임의의 3자리 숫자
```

### Gemini API 테스트

API 키가 없다면 fallback 로직으로 기본 분석 결과를 제공합니다.

## 🎭 사용자 플로우

1. **랜딩 페이지** → "무료 심리 테스트 시작" 클릭
2. **심리 테스트** → 5개 질문에 답변
3. **AI 분석** → Gemini가 실시간 분석
4. **결과 화면** → 떨어지는 카드로 인사이트 표시
5. **프리미엄 제안** → 상세 리포트 구매 제안
6. **결제** → Stripe 안전 결제
7. **다운로드** → PDF 리포트 즉시 다운로드

## 🌟 차별화 포인트

- ✅ **2026년 최신 AI** (Gemini 3 Flash)
- ✅ **물리 엔진 UI** (차별화된 사용자 경험)
- ✅ **즉각적인 수익화** (Stripe 통합)
- ✅ **완전 자동화** (AI 리포트 생성)
- ✅ **프리미엄 디자인** (글래스모피즘 + 다크모드)

## 📊 향후 개선 계획

- [ ] 사용자 계정 시스템 (Firebase Auth)
- [ ] 진행 상황 추적 대시보드
- [ ] 소셜 공유 기능
- [ ] 다국어 지원 (i18n)
- [ ] 모바일 앱 (React Native)
- [ ] 이메일 알림 (Resend)

## 🔒 보안 및 개인정보

- Stripe PCI DSS 준수
- HTTPS 강제 (프로덕션)
- 사용자 데이터 암호화
- GDPR 준수 준비

## 📝 라이센스

이 프로젝트는 개인 및 상업적 사용이 가능합니다.

## 🤝 기여

프로젝트 개선 아이디어나 버그 리포트는 환영합니다!

## 📧 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 언제든지 연락주세요.

---

**Made with ❤️ using Google Antigravity**

*당신의 마음 건강을 위한 AI 파트너*

---

**Last deployed**: 2026-01-23 04:02 KST
