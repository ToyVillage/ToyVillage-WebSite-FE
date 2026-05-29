@AGENTS.md
📝 Project Context
이 프로젝트는 Next.js 15(App Router) 기반의 '토이 빌리지(Toy Village)' 테마파크 웹 서비스입니다.

유저 뷰: 일반 방문객을 위한 정보 제공 및 이벤트 안내 페이지.

어드민 뷰: 관리자를 위한 데이터 관리 및 콘텐츠 수정 시스템 (/admin).

아키텍처: 복잡한 패턴(FSD 등) 대신 직관적이고 빠른 개발을 위해 모놀리식(Monolithic) 구조를 채택합니다.

📂 Folder Structure & Routing
Next.js의 Route Groups를 사용하여 레이아웃을 분리합니다.

app/(user)/: 유저 전용 레이아웃(Header에 로그인 버튼 포함, Footer 있음)을 공유하는 경로.

baseUrl/, baseUrl/events, baseUrl/news 등.

app/(admin)/: 어드민 및 로그인 레이아웃을 공유하는 경로.

baseUrl/login: 어드민 로그인 페이지.

baseUrl/admin/: 어드민 메인 대시보드 및 관리 페이지들.

components/: 도메인별(common, layout, event, news)로 구분된 UI 컴포넌트들.

assets/: 로고 및 아이콘 (SVG는 .tsx 컴포넌트로 관리).

💻 Code Style
Module System: ESM (import/export) 사용.

Export Pattern: 명명된 내보내기(Named Export)를 원칙으로 함. (단, Next.js 전용 파일인 page.tsx, layout.tsx 등은 export default 사용)

Styling: Tailwind CSS v4 사용. 조건부 클래스 결합은 cn() 유틸리티 활용.

SVG Handling: 모든 아이콘은 assets/ 내에 React 컴포넌트로 작성하며, fill="currentColor"를 적용해 Tailwind CSS의 text- 클래스로 색상을 제어함.

Client Components: 인터랙션이나 브라우저 API 사용 시 파일 최상단에 "use client"; 명시.

🛠️ Commands
npm run dev: 로컬 개발 서버 실행

npm run build: 프로덕션 빌드

npm run lint: 린트 체크

tsc --noEmit: 타입 체크

⚠️ Precautions (주의 사항)
Layout Separation: (user) 폴더와 (admin) 폴더의 레이아웃을 혼동하지 말 것. 유저 헤더에만 로그인 버튼이 존재함.

Auth Flow: 로그인이 완료되면 /admin으로 리다이렉트됨. 어드민이 로그인 상태로 baseUrl/로 이동할 경우, 유저 헤더는 [로그인] 대신 [관리자 모드] 버튼을 보여주어 흐름을 유지함.

Component Granularity: 모놀리식 구조이므로 파일이 너무 커지지 않도록 기능 단위로 컴포넌트를 적극 분리함 (components/ 하위 폴더 활용).

Z-index: 헤더 z-50, 모달 z-100 등 전역 기준 준수.