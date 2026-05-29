'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import capybara from '@/assets/animals/Capybara.png';
import AddButton from '@/components/domain/admin/AddButton';
import { getPopups } from '@/lib/api/popup';

export default function AdminPopupPage() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['popup'],
    queryFn: () => getPopups(),
  });

  const popups = data?.content ?? [];

  return (
    <>
      <AdminSubHeader imageSrc={capybara} title="TOY VILLAGE" subtitle="팝업 관리" />
      <main className="w-full px-20 py-12">
        <div className="mb-5">
          <AddButton href="/admin/popup/add" />
        </div>
        <div className="w-full overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-body-3 font-semibold text-gray-600 text-left">만료일</th>
                <th className="px-6 py-4 text-body-3 font-semibold text-gray-600 text-right whitespace-nowrap">우선순위</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {popups.length === 0 ? (
                <tr key="empty">
                  <td colSpan={2} className="px-6 py-12 text-center text-body-3 text-gray-400">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                popups.map((popup) => (
                  <tr
                    key={popup.id}
                    onClick={() => router.push(`/admin/popup/${popup.id}/edit`)}
                    className="cursor-pointer hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-body-3 text-black">{popup.expirationDate}</td>
                    <td className="px-6 py-4 text-body-3 text-gray-300 text-right">{popup.priority}</td>
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
