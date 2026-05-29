'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import { createEvent } from '@/lib/api/events';
import { uploadFile } from '@/lib/api/file';

export default function AddEventPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    event_name: '',
    event_description: '',
    event_start_date: '',
    event_end_date: '',
    event_subjects: '',
  });
  const [fileKey, setFileKey] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      router.push('/admin/events');
    },
  });

  const applyFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setImagePreview(URL.createObjectURL(file));
    setIsUploading(true);
    try {
      const result = await uploadFile(file);
      setFileKey(result.fileKey);
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) applyFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) applyFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileKey) return;
    mutate({
      ...form,
      event_start_date: form.event_start_date + 'T00:00:00',
      event_end_date: form.event_end_date + 'T23:59:59',
      file_key: fileKey,
    });
  };

  const canSubmit = !isPending && !isUploading && !!fileKey;

  return (
    <>
      <AdminSubHeader imageSrc={chinchilla} title="TOY VILLAGE" subtitle="이벤트 추가" />
      <main className="w-full px-20 py-12">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-8">
            <div
              className={`relative w-[50%] shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-[#E5E5E5] transition-colors ${isDragging ? 'bg-[#d0d0d0] ring-2 ring-main-forest-green' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <>
                  <Image src={imagePreview} alt="이벤트 이미지" fill className="object-cover" unoptimized />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-body-3">업로드 중...</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400">
                  <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.25 65.25C5.25625 65.25 3.55008 64.5407 2.1315 63.1221C0.712917 61.7035 0.00241667 59.9962 0 58V7.25C0 5.25625 0.7105 3.55008 2.1315 2.1315C3.5525 0.712917 5.25867 0.00241667 7.25 0H58C59.9938 0 61.7011 0.7105 63.1221 2.1315C64.5431 3.5525 65.2524 5.25867 65.25 7.25V58C65.25 59.9938 64.5407 61.7011 63.1221 63.1221C61.7035 64.5431 59.9962 65.2524 58 65.25H7.25ZM7.25 58H58V7.25H7.25V58ZM10.875 50.75H54.375L40.7812 32.625L29.9062 47.125L21.75 36.25L10.875 50.75Z" fill="#939393"/>
                  </svg>
                  <span className="text-body-3 text-center leading-snug">클릭하여 파일에서 추가 또는 끌어다 놓기</span>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

            <div className="flex-1 flex flex-col gap-4">
              <input name="event_name" value={form.event_name} onChange={handleChange} placeholder="제목 입력" required
                className="w-full rounded-xl bg-[#E5E5E5] px-4 py-3 text-subtitle-1 font-bold text-black outline-none focus:ring-2 focus:ring-main-forest-green" />
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-body-3 text-gray-500">시작일</label>
                  <input type="date" name="event_start_date" value={form.event_start_date} onChange={handleChange} required
                    className="w-full rounded-xl bg-[#E5E5E5] px-4 py-3 text-body-3 text-black outline-none focus:ring-2 focus:ring-main-forest-green" />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-body-3 text-gray-500">종료일</label>
                  <input type="date" name="event_end_date" value={form.event_end_date} onChange={handleChange} required
                    className="w-full rounded-xl bg-[#E5E5E5] px-4 py-3 text-body-3 text-black outline-none focus:ring-2 focus:ring-main-forest-green" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-body-3 text-gray-500">대상자</label>
                <input name="event_subjects" value={form.event_subjects} onChange={handleChange} placeholder="이벤트 대상자"
                  className="w-full rounded-xl bg-[#E5E5E5] px-4 py-3 text-body-3 text-black outline-none focus:ring-2 focus:ring-main-forest-green" />
              </div>
              <textarea name="event_description" value={form.event_description} onChange={handleChange}
                placeholder="이벤트 내용을 입력하세요" rows={10}
                className="w-full rounded-xl bg-[#E5E5E5] px-4 py-3 text-body-3 text-black outline-none resize-none focus:ring-2 focus:ring-main-forest-green" />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => router.back()}
              className="px-6 py-3 rounded-xl border border-gray-300 text-body-3 text-black hover:bg-gray-50 transition-colors cursor-pointer">
              뒤로가기
            </button>
            <button type="submit" disabled={!canSubmit}
              className="px-6 py-3 rounded-xl bg-main-forest-green text-body-3 text-white hover:bg-green-800 transition-colors cursor-pointer disabled:opacity-50">
              {isPending ? '등록 중...' : isUploading ? '이미지 업로드 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
