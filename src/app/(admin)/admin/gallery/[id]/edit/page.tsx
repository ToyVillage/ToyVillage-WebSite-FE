'use client';

import { useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import { deleteGallery, getGalleryById, updateGallery } from '@/lib/api/gallery';
import { IMAGE_BASE_URL, uploadFile } from '@/lib/api/file';

export default function EditGalleryPage() {
  const { id } = useParams() as { id: string };
  const numId = Number(id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [titleEdit, setTitleEdit] = useState<string | undefined>(undefined);
  const [fileKey, setFileKey] = useState('');
  const [uploadedPreview, setUploadedPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { data } = useQuery({
    queryKey: ['gallery', numId],
    queryFn: () => getGalleryById(numId),
  });

  const title = titleEdit ?? data?.gallery_title ?? '';
  const imagePreview = uploadedPreview || (data?.gallery_file_key ? IMAGE_BASE_URL + data.gallery_file_key : '');

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: () => updateGallery(numId, {
      gallery_title: title,
      ...(fileKey ? { file_key: fileKey } : {}),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      router.push('/admin/gallery');
    },
  });

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteGallery(numId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      router.push('/admin/gallery');
    },
  });

  const applyFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsUploading(true);
    setUploadedPreview(URL.createObjectURL(file));
    try {
      const { fileKey, fileUrl } = await uploadFile(file);
      setFileKey(fileKey);
      setUploadedPreview(fileUrl);
    } catch {
      setUploadedPreview('');
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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    update();
  };

  const handleDelete = () => {
    if (confirm('갤러리를 삭제하시겠습니까?')) remove();
  };

  return (
    <>
      <AdminSubHeader imageSrc={chinchilla} title="TOY VILLAGE" subtitle="갤러리 수정" />
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
                <Image src={imagePreview} alt="갤러리 이미지" fill className="object-cover" unoptimized />
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-body-3">업로드 중...</span>
                </div>
              )}
              {!isUploading && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                  <span className="text-white text-body-3 opacity-0 group-hover:opacity-100 transition">이미지 변경</span>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

            <div className="flex-1 flex flex-col gap-4">
              <input value={title} onChange={(e) => setTitleEdit(e.target.value)}
                placeholder="제목 입력" required
                className="w-full rounded-xl bg-[#E5E5E5] px-4 py-3 text-subtitle-1 font-bold text-black outline-none focus:ring-2 focus:ring-main-forest-green" />
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
                {isUpdating ? '저장 중...' : isUploading ? '업로드 중...' : '저장'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
