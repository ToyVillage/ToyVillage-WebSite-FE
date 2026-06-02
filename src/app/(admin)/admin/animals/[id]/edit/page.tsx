'use client';

import { useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import capybara from '@/assets/animals/Capybara.png';
import { deleteAnimal, getAnimalById, updateAnimal } from '@/lib/api/animals';

const ANIMAL_TYPES = [
  { value: 'MAMMALS', label: '포유류' },
  { value: 'REPTILES', label: '파충류' },
  { value: 'FISH', label: '어류' },
  { value: 'BIRDS', label: '조류' },
];

export default function EditAnimalPage() {
  const { id } = useParams() as { id: string };
  const numId = Number(id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [edits, setEdits] = useState<{
    animalKind?: string;
    animalDescription?: string;
    animalType?: string;
    popularAnimal?: boolean;
  }>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const { data } = useQuery({
    queryKey: ['animals', numId],
    queryFn: () => getAnimalById(numId),
  });

  const fields = {
    animalKind: edits.animalKind ?? data?.animal_kind ?? '',
    animalDescription: edits.animalDescription ?? data?.animal_description ?? '',
    animalType: edits.animalType ?? data?.animal_type ?? 'MAMMALS',
    popularAnimal: edits.popularAnimal ?? data?.popular_animal ?? false,
  };

  const imagePreview = uploadedPreview || data?.animal_image || '';

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      if (imageFile) {
        formData.append('animalImage', imageFile);
      } else if (data?.animal_image) {
        const res = await fetch(data.animal_image);
        const blob = await res.blob();
        const fileName = data.animal_image.split('/').pop() ?? 'image';
        formData.append('animalImage', new File([blob], fileName, { type: blob.type }));
      }
      formData.append('animalKind', fields.animalKind);
      formData.append('animalDescription', fields.animalDescription);
      formData.append('animalType', fields.animalType);
      formData.append('popularAnimal', String(fields.popularAnimal));
      return updateAnimal(numId, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      router.push('/admin/animals');
    },
  });

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteAnimal(numId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      router.push('/admin/animals');
    },
  });

  const applyFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setImageFile(file);
    setUploadedPreview(URL.createObjectURL(file));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setEdits((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
    if (confirm('동물을 삭제하시겠습니까?')) remove();
  };

  return (
    <>
      <AdminSubHeader imageSrc={capybara} title="TOY VILLAGE" subtitle="동물 수정" />
      <main className="w-full px-20 py-12">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-8">
            <div
              className={`group relative w-[40%] aspect-square shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-[#E5E5E5] transition-colors ${isDragging ? 'bg-[#d0d0d0] ring-2 ring-main-forest-green' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {imagePreview && (
                <Image src={imagePreview} alt="동물 이미지" fill className="object-cover" unoptimized />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                <span className="text-white text-body-3 opacity-0 group-hover:opacity-100 transition">이미지 변경</span>
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

            <div className="flex-1 flex flex-col gap-4">
              <input name="animalKind" value={fields.animalKind} onChange={handleChange}
                placeholder="동물 이름" required
                className="w-full rounded-xl bg-[#E5E5E5] px-4 py-3 text-subtitle-1 font-bold text-black outline-none focus:ring-2 focus:ring-main-forest-green" />
              <div className="flex flex-col gap-1">
                <label className="text-body-3 text-gray-500">종류</label>
                <select name="animalType" value={fields.animalType} onChange={handleChange}
                  className="w-full rounded-xl bg-[#E5E5E5] px-4 py-3 text-body-3 text-black outline-none focus:ring-2 focus:ring-main-forest-green appearance-none cursor-pointer">
                  {ANIMAL_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <textarea name="animalDescription" value={fields.animalDescription} onChange={handleChange}
                placeholder="동물 설명을 입력하세요" rows={8}
                className="w-full rounded-xl bg-[#E5E5E5] px-4 py-3 text-body-3 text-black outline-none resize-none focus:ring-2 focus:ring-main-forest-green" />
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" name="popularAnimal" checked={fields.popularAnimal} onChange={handleChange}
                  className="w-5 h-5 rounded accent-main-forest-green cursor-pointer" />
                <span className="text-body-3 text-black">인기 동물로 설정</span>
              </label>
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
