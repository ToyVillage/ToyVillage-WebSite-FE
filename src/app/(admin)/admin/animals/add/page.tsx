'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import capybara from '@/assets/animals/Capybara.png';
import { createAnimal } from '@/lib/api/animals';

const ANIMAL_TYPES = [
  { value: 'MAMMALS', label: '포유류' },
  { value: 'REPTILES', label: '파충류' },
  { value: 'FISH', label: '어류' },
  { value: 'BIRDS', label: '조류' },
];

export default function AddAnimalPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState({
    animalKind: '',
    animalDescription: '',
    animalType: 'MAMMALS',
    popularAnimal: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: createAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      router.push('/admin/animals');
    },
  });

  const applyFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFields((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
    if (!imageFile) return;
    const formData = new FormData();
    formData.append('animalImage', imageFile);
    formData.append('animalKind', fields.animalKind);
    formData.append('animalDescription', fields.animalDescription);
    formData.append('animalType', fields.animalType);
    formData.append('popularAnimal', String(fields.popularAnimal));
    mutate(formData);
  };

  const canSubmit = !isPending && !!imageFile;

  return (
    <>
      <AdminSubHeader imageSrc={capybara} title="TOY VILLAGE" subtitle="동물 추가" />
      <main className="w-full px-20 py-12">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-8">
            <div
              className={`relative w-[40%] aspect-square shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-[#E5E5E5] transition-colors ${isDragging ? 'bg-[#d0d0d0] ring-2 ring-main-forest-green' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <Image src={imagePreview} alt="동물 이미지" fill className="object-cover" unoptimized />
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
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => router.back()}
              className="px-6 py-3 rounded-xl border border-gray-300 text-body-3 text-black hover:bg-gray-50 transition-colors cursor-pointer">
              뒤로가기
            </button>
            <button type="submit" disabled={!canSubmit}
              className="px-6 py-3 rounded-xl bg-main-forest-green text-body-3 text-white hover:bg-green-800 transition-colors cursor-pointer disabled:opacity-50">
              {isPending ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
