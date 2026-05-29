'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getActivePopups, PopupItem } from '@/lib/api/popup';

function isSuppressedToday(id: number): boolean {
  if (typeof window === 'undefined') return false;
  const until = localStorage.getItem(`popup_hidden_${id}`);
  if (!until) return false;
  return new Date() < new Date(until);
}

function suppressToday(id: number): void {
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  localStorage.setItem(`popup_hidden_${id}`, endOfDay.toISOString());
}

export function PopupModal() {
  const [queue, setQueue] = useState<PopupItem[]>([]);

  const { data: popups = [] } = useQuery<PopupItem[]>({
    queryKey: ['active-popups'],
    queryFn: getActivePopups,
  });

  useEffect(() => {
    if (popups.length > 0) {
      setQueue(popups.filter((p) => !isSuppressedToday(p.id)));
    }
  }, [popups]);

  if (queue.length === 0) return null;

  const current = queue[0];
  const next = () => setQueue((prev) => prev.slice(1));

  const handleHideToday = () => {
    suppressToday(current.id);
    next();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
      {/* 다음 팝업 이미지 프리로드 */}
      {queue.slice(1).map((p) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={p.id} src={p.popupImage} alt="" className="hidden" />
      ))}

      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-120 max-w-[90vw]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.id}
          src={current.popupImage}
          alt="팝업 이미지"
          className="block w-auto max-w-full max-h-[75vh] mx-auto"
        />
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <button
            onClick={handleHideToday}
            className="text-body-3 text-gray-400 hover:text-black transition cursor-pointer"
          >
            오늘은 그만보기
          </button>
          <button
            onClick={next}
            className="text-body-3 text-black font-semibold hover:text-gray-600 transition cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
