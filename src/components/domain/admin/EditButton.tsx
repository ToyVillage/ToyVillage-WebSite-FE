'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface EditButtonProps {
  id: number;
  basePath: string;
  onDelete?: () => void;
}

export default function EditButton({ id, basePath, onDelete }: EditButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = () => {
    setOpen(false);
    router.push(`${basePath}/${id}/edit`);
  };

  const handleDelete = () => {
    setOpen(false);
    onDelete?.();
  };

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-label="옵션 열기"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center w-6 h-6 cursor-pointer"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="5" r="2" fill="currentColor" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <circle cx="12" cy="19" r="2" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full mt-1 right-0 z-50 w-23 h-28 flex flex-col bg-white rounded-lg overflow-hidden shadow-md"
          role="menu"
          aria-label="옵션 메뉴"
        >
          <button
            type="button"
            role="menuitem"
            aria-label="수정"
            onClick={handleEdit}
            className="flex w-23 h-10 mt-4 items-center justify-center py-2 cursor-pointer"
          >
            <span className="text-black w-fit text-subtitle-2">수정</span>
          </button>
          <button
            type="button"
            role="menuitem"
            aria-label="삭제"
            onClick={handleDelete}
            className="flex w-23 h-10 items-center justify-center py-2 cursor-pointer"
          >
            <span className="text-[#ff5555] w-fit text-subtitle-2">삭제</span>
          </button>
        </div>
      )}
    </div>
  );
}
