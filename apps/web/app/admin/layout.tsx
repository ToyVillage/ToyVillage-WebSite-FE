// apps/web/app/admin/layout.tsx
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 어드민 사이드바 (나중에 컴포넌트로 분리) */}
      {/* <aside className="w-64 bg-slate-800 text-white p-6">
        <h2 className="text-xl font-bold mb-10">Toy Village Admin</h2>
        <nav className="space-y-4">
          <div className="hover:text-blue-400 cursor-pointer">뉴스 관리</div>
          <div className="hover:text-blue-400 cursor-pointer">이벤트 관리</div>
        </nav>
      </aside> */}

      {/* 본문 영역 */}
      <main className="flex-1 p-8">
        <header className="mb-8 pb-4 border-bottom">
          <h1 className="text-gray-500">관리자 모드 실행 중</h1>
        </header>
        {children}
      </main>
    </div>
  );
}