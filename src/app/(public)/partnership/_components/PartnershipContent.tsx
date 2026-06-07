'use client';

import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import SubHeader from '@/components/layout/SubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import { createPartnership, PartnershipRequest } from '@/lib/api/partnership';
import { uploadFilePublic } from '@/lib/api/file';

const INQUIRY_TYPES: { value: PartnershipRequest['partnershipType']; label: string }[] = [
  { value: 'MARKETING', label: '마케팅 제휴' },
  { value: 'STORE_OPENING', label: '입점 관련' },
  { value: 'OTHER', label: '기타 제휴' },
];

interface UploadedFile {
  name: string;
  fileKey: string;
  uploading: boolean;
  error?: string;
}

export function PartnershipContent() {
  const [form, setForm] = useState({
    partnershipType: '' as PartnershipRequest['partnershipType'] | '',
    title: '',
    name: '',
    email: '',
    phoneNumber: '',
    content: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: createPartnership,
    onSuccess: () => setSubmitted(true),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFiles: UploadedFile[] = Array.from(files).map((f) => ({
      name: f.name,
      fileKey: '',
      uploading: true,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    const startIndex = uploadedFiles.length;

    await Promise.all(
      Array.from(files).map(async (file, i) => {
        try {
          const { fileKey } = await uploadFilePublic(file);
          setUploadedFiles((prev) =>
            prev.map((f, idx) =>
              idx === startIndex + i ? { ...f, fileKey, uploading: false } : f
            )
          );
        } catch {
          setUploadedFiles((prev) =>
            prev.map((f, idx) =>
              idx === startIndex + i ? { ...f, uploading: false, error: '업로드 실패' } : f
            )
          );
        }
      })
    );
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!form.partnershipType) return;

    const successfulKeys = uploadedFiles
      .filter((f) => !f.uploading && !f.error && f.fileKey)
      .map((f) => f.fileKey);

    mutate({
      ...(form as PartnershipRequest),
      file_keys: successfulKeys.length > 0 ? successfulKeys : undefined,
    });
  };

  const isUploading = uploadedFiles.some((f) => f.uploading);

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

          <div className="flex flex-col gap-3">
            <label className="text-body-2 text-black">파일 첨부 <span className="text-body-3 text-gray-400">(선택)</span></label>

            <div
              className={`w-full border-2 border-dashed rounded-lg px-6 py-10 flex flex-col items-center gap-3 cursor-pointer transition-colors ${isDragging ? 'border-main-forest-green bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              <p className="text-body-3 text-gray-500">클릭하거나 파일을 드래그하여 첨부하세요</p>
              <p className="text-body-3 text-gray-400 text-sm">여러 파일을 동시에 첨부할 수 있습니다</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            {uploadedFiles.length > 0 && (
              <ul className="flex flex-col gap-2">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 min-w-0">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <span className="text-body-3 text-gray-700 truncate">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-3 shrink-0">
                      {file.uploading && (
                        <span className="text-body-3 text-gray-400">업로드 중...</span>
                      )}
                      {file.error && (
                        <span className="text-body-3 text-red-500">{file.error}</span>
                      )}
                      {!file.uploading && !file.error && (
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        aria-label="파일 제거"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-end">
            <button type="submit" disabled={isPending || isUploading}
              className="px-10 py-3 bg-main-forest-green text-white text-body-2 font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50">
              {isUploading ? '파일 업로드 중...' : isPending ? '제출 중...' : '제출하기'}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
