'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import { getPartnershipById } from '@/lib/api/partnership';

const PARTNERSHIP_TYPE_LABELS: Record<string, string> = {
  MARKETING: '마케팅',
  STORE_OPENING: '입점',
  OTHER: '기타',
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex border-b border-gray-100 py-4">
      <dt className="w-32 shrink-0 text-body-3 font-semibold text-gray-500">{label}</dt>
      <dd className="flex-1 text-body-3 text-black">{value}</dd>
    </div>
  );
}

export default function PartnershipDetailPage() {
  const { id } = useParams() as { id: string };
  const numId = Number(id);
  const router = useRouter();

  const { data: detail } = useQuery({
    queryKey: ['partnership', numId],
    queryFn: () => getPartnershipById(numId),
  });

  if (!detail) return null;

  return (
    <>
      <AdminSubHeader imageSrc={chinchilla} title="TOY VILLAGE" subtitle="제휴 문의 상세" />
      <main className="w-full  px-20 py-12">
        <div>
          <dl>
            <DetailRow label="문의 유형" value={PARTNERSHIP_TYPE_LABELS[detail.partnership_type] ?? detail.partnership_type} />
            <DetailRow label="제목" value={detail.partnership_title} />
            <DetailRow label="이메일" value={detail.partnership_email} />
            <DetailRow label="연락처" value={detail.partnership_phone_number} />
            <DetailRow label="등록일" value={detail.partnership_created_at?.slice(0, 10).replace(/-/g, '.') ?? ''} />
          </dl>
          <div className="mt-6">
            <p className="text-body-3 font-semibold text-gray-500 mb-2">문의 내용</p>
            <div className="rounded-xl bg-gray-200 px-6 py-5 text-body-3 text-black leading-relaxed whitespace-pre-wrap">
              {detail.partnership_content}
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button onClick={() => router.back()}
              className="px-6 py-3 rounded-xl border border-gray-300 text-body-3 text-black hover:bg-gray-50 transition-colors cursor-pointer">
              뒤로가기
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
