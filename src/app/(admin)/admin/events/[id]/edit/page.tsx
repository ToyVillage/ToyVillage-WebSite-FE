'use client';

import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import { deleteEvent, getEventById, updateEvent } from '@/lib/api/events';
import { uploadFile, IMAGE_BASE_URL } from '@/lib/api/file';

type FormEdits = {
  event_name?: string;
  event_description?: string;
  event_start_date?: string;
  event_end_date?: string;
  event_subjects?: string;
};

export default function EditEventPage() {
  const { id } = useParams() as { id: string };
  const numId = Number(id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [edits, setEdits] = useState<FormEdits>({});
  const [newFileKey, setNewFileKey] = useState('');
  const [uploadedPreview, setUploadedPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { data } = useQuery({
    queryKey: ['events', numId],
    queryFn: () => getEventById(numId),
  });

  const form = {
    event_name: edits.event_name ?? data?.eventName ?? '',
    event_description: edits.event_description ?? data?.eventDescription ?? '',
    event_start_date: edits.event_start_date ?? data?.eventStartDate?.slice(0, 10) ?? '',
    event_end_date: edits.event_end_date ?? data?.eventEndDate?.slice(0, 10) ?? '',
    event_subjects: edits.event_subjects ?? data?.eventSubjects ?? '',
  };
  const fileKey = newFileKey || data?.fileKey || '';
  const imagePreview = uploadedPreview || (fileKey ? IMAGE_BASE_URL + fileKey : '');

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: () => updateEvent(numId, {
      ...form,
      event_start_date: form.event_start_date + 'T00:00:00',
      event_end_date: form.event_end_date + 'T23:59:59',
      file_key: fileKey,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      router.push('/admin/events');
    },
  });

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteEvent(numId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      router.push('/admin/events');
    },
  });

  const applyFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setUploadedPreview(URL.createObjectURL(file));
    setIsUploading(true);
    try {
      const result = await uploadFile(file);
      setNewFileKey(result.fileKey);
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEdits((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) applyFile(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) applyFile(file);
  };

  const handleDelete = () => {
    if (confirm('이벤트를 삭제하시겠습니까?')) remove();
  };

  return (
    <>
      <AdminSubHeader imageSrc={chinchilla} title="TOY VILLAGE" subtitle="이벤트 수정" />
      <main className="w-full px-20 py-12">
        <form onSubmit={(e) => { e.preventDefault(); update(); }}>
          <div className="flex gap-8">
            <div
              className={`group relative w-[50%] shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-[#E5E5E5] transition-colors ${isDragging ? 'bg-[#d0d0d0] ring-2 ring-main-forest-green' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {imagePreview && (
                <Image src={imagePreview} alt="이벤트 이미지" fill className="object-cover" unoptimized />
              )}
              {isUploading ? (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-body-3">업로드 중...</span>
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                  <span className="text-white text-body-3 opacity-0 group-hover:opacity-100 transition">이미지 변경</span>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

            <div className="flex-1 flex flex-col gap-4">
              <input name="event_name" value={form.event_name} onChange={handleChange} placeholder="이벤트명" required
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
          <div className="flex justify-between mt-4">
            <button type="button" onClick={handleDelete} disabled={isDeleting}
              className="px-6 py-3 rounded-xl bg-red-500 text-body-3 text-white hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50">
              {isDeleting ? '삭제 중...' : '삭제하기'}
            </button>
            <div className="flex gap-3">
              <button type="button" onClick={() => router.back()}
                className="px-6 py-3 rounded-xl border border-gray-300 text-body-3 text-black hover:bg-gray-50 transition-colors cursor-pointer">
                뒤로가기
              </button>
              <button type="submit" disabled={isUpdating || isUploading}
                className="px-6 py-3 rounded-xl bg-main-forest-green text-body-3 text-white hover:bg-green-800 transition-colors cursor-pointer disabled:opacity-50">
                {isUpdating ? '저장 중...' : isUploading ? '이미지 업로드 중...' : '저장'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
