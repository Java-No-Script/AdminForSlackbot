# 챗봇 어드민 페이지

> 슬랙 챗봇의 관리자 대시보드

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC)

## 📋 프로젝트 개요

새로운 입사자가 합류할 때 반복되는 질문들을 효율적으로 처리하고, 사내 문서를 체계적으로 관리할 수 있는 챗봇 관리 시스템입니다.

### 🎯 주요 목표

- **자동화된 온보딩**: 반복적인 질문에 대한 자동 응답
- **문서 관리**: Markdown, PDF, TXT 등 다양한 형식의 문서 관리
- **데이터 수집**: 웹페이지 크롤링을 통한 자동 데이터 수집
- **실시간 모니터링**: 챗봇 활동 및 사용자 상호작용 추적

## 🚀 기술 스택

### Frontend
- **Next.js 15** - React 프레임워크 (App Router)
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS 4** - 스타일링
- **shadcn/ui** - UI 컴포넌트 라이브러리
- **Lucide React** - 아이콘

### Development Tools
- **Storybook 8** - 컴포넌트 개발 및 문서화
- **ESLint** - 코드 품질 관리
- **Geist Font** - 타이포그래피

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 18.17 이상
- npm 또는 yarn

### 설치
```bash
# 저장소 클론
git clone https://github.com/Java-No-Script/AdminForSlackbot.git
cd AdminForSlackbot

# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
# 개발 서버 시작 (Turbopack 사용)
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

### 스토리북 실행
```bash
# 스토리북 개발 서버 시작
npm run storybook

# 브라우저에서 http://localhost:6006 접속
```

### 빌드 및 배포
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

## 📁 프로젝트 구조

```
├── app/                          # Next.js App Router
│   ├── (pages)/                  # 페이지 컴포넌트
│   │   ├── messages/            # 메시지 관리
│   │   ├── categories/          # 카테고리 관리
│   │   ├── documents/           # 문서 관리
│   │   ├── crawler/             # 데이터 수집
│   │   └── settings/            # 설정
│   ├── globals.css              # 전역 스타일
│   └── layout.tsx               # 루트 레이아웃
├── components/                   # 재사용 가능한 컴포넌트
│   ├── ui/                      # shadcn/ui 컴포넌트
│   ├── modals/                  # 모달 컴포넌트
│   ├── layout.tsx               # 메인 레이아웃
│   └── sidebar.tsx              # 사이드바 네비게이션
├── lib/                         # 유틸리티 및 설정
│   ├── api/                     # API 서비스 함수
│   ├── mock-data/               # 목 데이터
│   ├── types/                   # TypeScript 타입 정의
│   └── utils.ts                 # 공통 유틸리티
└── public/                      # 정적 파일
```

## 🎨 주요 기능

### 1. 📊 대시보드
- 실시간 통계 현황
- 최근 활동 로그
- 인기 질문 순위
- 채널 관리 (등록/수정/삭제)

### 2. 💬 메시지 관리
- 슬랙 메시지 조회/수정/삭제
- 검색 및 필터링
- 상태별 관리 (활성/보관됨)
- 응답 시간 및 만족도 추적

### 3. 📂 카테고리 관리
- 카테고리 생성/수정/삭제
- 문서 분류 체계 관리
- 키워드 기반 자동 분류

### 4. 📄 문서 관리
- 다중 파일 형식 지원 (MD, PDF, TXT, DOCX)
- 파일 업로드 및 메타데이터 추출
- 문서 상태 모니터링
- 다운로드 통계

### 5. 🕷️ 데이터 수집
- 웹페이지 자동 크롤링
- URL 패턴 기반 수집
- 실시간 진행 상황 모니터링
- 수집 작업 스케줄링

### 6. ⚙️ 설정
- 챗봇 기본 설정
- 알림 설정 (이메일/슬랙)
- API 키 관리
- 백업 및 복원
