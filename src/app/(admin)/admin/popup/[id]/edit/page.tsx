'use client';

import { use, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import capybara from '@/assets/animals/Capybara.png';
import { deletePopup, getPopupById, PopupRequest, updatePopup } from '@/lib/api/popup';
import { IMAGE_BASE_URL, uploadFile } from '@/lib/api/file';

interface EditPopupPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPopupPage({ params }: EditPopupPageProps) {
  const { id } = use(params);
  const numId = Number(id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newFileKey, setNewFileKey] = useState('');
  const [blobPreview, setBlobPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [expirationDate, setExpirationDate] = useState('');
  const [priority, setPriority] = useState<number | ''>('');

  const { data } = useQuery({
    queryKey: ['popup', numId],
    queryFn: () => getPopupById(numId),
  });

  const imagePreview = blobPreview || data?.popupImage || '';
  const resolvedExpirationDate = expirationDate || data?.expirationDate || '';
  const resolvedPriority = priority !== '' ? priority : (data?.priority ?? 1);

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: (body: PopupRequest) => updatePopup(numId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['popup'] });
      router.push('/admin/popup');
    },
  });

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: () => deletePopup(numId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['popup'] });
      router.push('/admin/popup');
    },
  });

  const applyFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsUploading(true);
    setBlobPreview(URL.createObjectURL(file));
    try {
      const { fileKey: key, fileUrl } = await uploadFile(file);
      setNewFileKey(key);
      setBlobPreview(fileUrl);
    } catch {
      setBlobPreview('');
    } finally {
      setIsUploading(false);
    }
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
    update({
      file_key: newFileKey || (data?.popupImage ?? '').replace(IMAGE_BASE_URL, ''),
      expiration_date: resolvedExpirationDate,
      priority: resolvedPriority as number,
    });
  };

  const handleDelete = () => {
    if (confirm('팝업을 삭제하시겠습니까?')) remove();
  };

  return (
    <>
      <AdminSubHeader imageSrc={capybara} title="TOY VILLAGE" subtitle="팝업 수정" />
      <main className="w-full px-20 py-12">
        <form onSubmit={handleSubmit}>
          <div className="flex items-start gap-8">
            <div
              className={`group relative w-[50%] aspect-video shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-[#E5E5E5] transition-colors ${isDragging ? 'bg-[#d0d0d0] ring-2 ring-main-forest-green' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {imagePreview && (
                <Image src={imagePreview} alt="팝업 이미지" fill className="object-cover"
                  unoptimized={imagePreview.startsWith('blob:')} />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                <span className="text-white text-body-3 opacity-0 group-hover:opacity-100 transition">이미지 변경</span>
              </div>
              {isUploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-body-3">업로드 중...</span>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-body-3 text-gray-600">만료일</label>
                <input type="date" value={resolvedExpirationDate} onChange={(e) => setExpirationDate(e.target.value)} required
                  className="rounded-xl bg-[#E5E5E5] px-4 py-3 text-body-3 text-black outline-none focus:ring-2 focus:ring-main-forest-green" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-body-3 text-gray-600">우선순위</label>
                <input type="number" min={1} value={resolvedPriority} onChange={(e) => setPriority(Number(e.target.value))} required
                  className="rounded-xl bg-[#E5E5E5] px-4 py-3 text-body-3 text-black outline-none focus:ring-2 focus:ring-main-forest-green" />
              </div>
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
                {isUpdating ? '저장 중...' : '수정하기'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
