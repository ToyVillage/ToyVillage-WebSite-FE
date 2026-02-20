// apps/web/app/admin/page.tsx

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

// 1. 함수 이름은 대문자로 시작하는 것이 관례입니다.
// 2. 반드시 'export default' 키워드가 붙어야 합니다.
export default function AdminPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">대시보드</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-gray-700">등록된 뉴스</h3>
          <p className="text-3xl font-bold text-blue-600">12개</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-gray-700">진행 중인 이벤트</h3>
          <p className="text-3xl font-bold text-green-600">5개</p>
        </div>
      </div>
      <Button children="nextjs" appName="안녕"></Button>
      <Card title="카드" children="아아아아아아" href="naver.com"></Card>
    </section>
  );
}