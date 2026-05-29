'use client';

import { useQuery } from '@tanstack/react-query';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import { getPartnerships } from '@/lib/api/partnership';

export default function AdminPartnershipPage() {
  const { data: partnerships = [] } = useQuery({
    queryKey: ['partnership'],
    queryFn: getPartnerships,
  });

  return (
    <>
      <AdminSubHeader imageSrc={chinchilla} title="TOY VILLAGE" subtitle="제휴 문의" />
      <main className="w-full bg-white px-20 py-12">
        <div className="w-full overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-body-3 font-semibold text-gray-600 text-left">제목</th>
                <th className="px-6 py-4 text-body-3 font-semibold text-gray-600 text-right whitespace-nowrap">수신일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {partnerships.length === 0 ? (
                <tr key="empty">
                  <td colSpan={2} className="px-6 py-12 text-center text-body-3 text-gray-400">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                partnerships.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-body-3 text-black">{p.title}</td>
                    <td className="px-6 py-4 text-body-3 text-gray-300 text-right whitespace-nowrap">
                      {p.received_Date ? p.received_Date.slice(0, 10).replace(/-/g, '.') : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
