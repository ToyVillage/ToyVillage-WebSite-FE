'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import { deleteFaq, FaqItem, FaqRequest, getFaqById, updateFaq } from '@/lib/api/faq';

export default function FaqDetailPage() {
  const { id } = useParams() as { id: string };
  const numId = Number(id);
  const router = useRouter();
  const queryClient = useQueryClient();

  const [edits, setEdits] = useState<Partial<FaqRequest>>({});

  const { data } = useQuery({
    queryKey: ['faq', numId],
    queryFn: () => getFaqById(numId),
    initialData: () =>
      queryClient.getQueryData<FaqItem[]>(['faq'])?.find((f) => f.question_id === numId),
  });

  const form: FaqRequest = {
    question_content: edits.question_content ?? data?.question_content ?? '',
    question_answer: edits.question_answer ?? data?.question_answer ?? '',
  };

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: (body: FaqRequest) => updateFaq(numId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faq'] });
      router.push('/admin/faq');
    },
  });

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteFaq(numId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faq'] });
      router.push('/admin/faq');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEdits((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    update(form);
  };

  const handleDelete = () => {
    if (confirm('FAQ를 삭제하시겠습니까?')) remove();
  };

  return (
    <>
      <AdminSubHeader imageSrc={chinchilla} title="TOY VILLAGE" subtitle="FAQ 수정" />
      <main className="w-full px-20 py-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-body-3 text-gray-500">질문</label>
            <input name="question_content" value={form.question_content} onChange={handleChange}
              placeholder="질문을 입력하세요" required
              className="w-full rounded-xl bg-[#E5E5E5] px-4 py-3 text-subtitle-1 font-bold text-black outline-none focus:ring-2 focus:ring-main-forest-green" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-body-3 text-gray-500">답변</label>
            <textarea name="question_answer" value={form.question_answer} onChange={handleChange}
              placeholder="답변을 입력하세요" rows={10} required
              className="w-full rounded-xl bg-[#E5E5E5] px-4 py-3 text-body-3 text-black outline-none resize-none focus:ring-2 focus:ring-main-forest-green" />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={handleDelete} disabled={isDeleting}
              className="px-6 py-3 rounded-xl bg-red-500 text-body-3 text-white hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50">
              {isDeleting ? '삭제 중...' : '삭제하기'}
            </button>
            <div className="flex gap-3">
              <button type="button" onClick={() => router.back()}
                className="px-6 py-3 rounded-xl border border-gray-300 text-body-3 text-black hover:bg-gray-50 transition-colors cursor-pointer">
                뒤로가기
              </button>
              <button type="submit" disabled={isUpdating}
                className="px-6 py-3 rounded-xl bg-main-forest-green text-body-3 text-white hover:bg-green-800 transition-colors cursor-pointer disabled:opacity-50">
                {isUpdating ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}