'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import SubHeader from '@/components/layout/SubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import { createPartnership, PartnershipRequest } from '@/lib/api/partnership';

const INQUIRY_TYPES: { value: PartnershipRequest['partnershipType']; label: string }[] = [
  { value: 'MARKETING', label: '마케팅 제휴' },
  { value: 'STORE_OPENING', label: '입점 관련' },
  { value: 'OTHER', label: '기타 제휴' },
];

export function PartnershipContent() {
  const [form, setForm] = useState({
    partnershipType: '' as PartnershipRequest['partnershipType'] | '',
    title: '',
    name: '',
    email: '',
    phoneNumber: '',
    content: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: createPartnership,
    onSuccess: () => setSubmitted(true),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!form.partnershipType) return;
    mutate(form as PartnershipRequest);
  };

  if (submitted) {
    return (
      <>
        <SubHeader imageSrc={chinchilla} title="제휴 문의" subtitle="Partnership" />
        <main className="w-full px-22 py-16 flex flex-col items-center gap-4">
          <p className="text-subtitle-1 font-bold text-black">문의가 접수되었습니다.</p>
          <p className="text-body-3 text-gray-500">빠른 시일 내에 연락드리겠습니다.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <SubHeader imageSrc={chinchilla} title="제휴 문의" subtitle="Partnership" />
      <main className="w-full px-22 py-16 mx-auto">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-body-2 text-black">원하시는 유형을 선택해주세요</label>
            <select
              name="partnershipType"
              value={form.partnershipType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-body-3 text-black appearance-none bg-white focus:outline-none focus:border-gray-400 cursor-pointer"
            >
              <option value="" disabled>(선택)</option>
              {INQUIRY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-2 text-black">제목을 입력해주세요</label>
            <input name="title" type="text" value={form.title} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-5 py-3 text-body-3 text-black focus:outline-none focus:border-gray-400" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-2 text-black">이름을 입력해주세요</label>
            <input name="name" type="text" value={form.name} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-body-3 text-black focus:outline-none focus:border-gray-400" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-2 text-black">이메일을 입력해주세요</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-body-3 text-black focus:outline-none focus:border-gray-400" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-2 text-black">연락처를 입력해주세요</label>
            <input name="phoneNumber" type="tel" value={form.phoneNumber} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-body-3 text-black focus:outline-none focus:border-gray-400" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-2 text-black">내용을 입력해주세요</label>
            <textarea name="content" value={form.content} onChange={handleChange} required rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-body-3 text-black resize-none focus:outline-none focus:border-gray-400" />
          </div>
          <div className="flex items-center justify-end">
            <button type="submit" disabled={isPending}
              className="px-10 py-3 bg-main-forest-green text-white text-body-2 font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50">
              {isPending ? '제출 중...' : '제출하기'}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
