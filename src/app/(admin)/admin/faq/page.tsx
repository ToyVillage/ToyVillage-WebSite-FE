'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import AddButton from '@/components/domain/admin/AddButton';
import { getFaqs } from '@/lib/api/faq';

export default function AdminFaqPage() {
  const router = useRouter();

  const { data: faqs = [] } = useQuery({
    queryKey: ['faq'],
    queryFn: getFaqs,
  });

  return (
    <>
      <AdminSubHeader imageSrc={chinchilla} title="TOY VILLAGE" subtitle="자주 묻는 질문" />
      <main className="w-full px-20 py-12">
        <div className="mb-5">
          <AddButton href="/admin/faq/add" />
        </div>
        <div className="w-full overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-body-3 font-semibold text-gray-600">질문</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {faqs.length === 0 ? (
                <tr key="empty">
                  <td className="px-6 py-12 text-center text-body-3 text-gray-400">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr
                    key={faq.question_id}
                    onClick={() => router.push(`/admin/faq/${faq.question_id}`)}
                    className="cursor-pointer hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-body-3 text-black">
                      {faq.question_content}
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
