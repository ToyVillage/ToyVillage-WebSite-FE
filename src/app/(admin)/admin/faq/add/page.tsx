'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import { createFaq, FaqRequest } from '@/lib/api/faq';

export default function AddFaqPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FaqRequest>({ question_content: '', question_answer: '' });

  const { mutate, isPending } = useMutation({
    mutationFn: createFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faq'] });
      router.push('/admin/faq');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <>
      <AdminSubHeader imageSrc={chinchilla} title="TOY VILLAGE" subtitle="FAQ 추가" />
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
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => router.back()}
              className="px-6 py-3 rounded-xl border border-gray-300 text-body-3 text-black hover:bg-gray-50 transition-colors cursor-pointer">
              뒤로가기
            </button>
            <button type="submit" disabled={isPending}
              className="px-6 py-3 rounded-xl bg-main-forest-green text-body-3 text-white hover:bg-green-800 transition-colors cursor-pointer disabled:opacity-50">
              {isPending ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
