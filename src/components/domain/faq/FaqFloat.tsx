'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFaqs } from '@/lib/api/faq';

export function FaqFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);

  const { data: faqs = [] } = useQuery({
    queryKey: ['faqs'],
    queryFn: getFaqs,
    enabled: isOpen,
  });

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="fixed bottom-8 right-8 z-60 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-80 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-[#1E1E1E] px-5 py-4 flex items-center justify-between">
            <span className="text-white font-semibold text-body-3">자주 묻는 질문</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto bg-white">
            {faqs.map((faq) => (
              <div key={faq.question_id}>
                <button
                  onClick={() => toggle(faq.question_id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left bg-white transition cursor-pointer"
                >
                  <span className="text-body-3 text-black pr-4">{faq.question_content}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`shrink-0 transition-transform duration-200 ${openId === faq.question_id ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {openId === faq.question_id && (
                  <div className="px-5 p-3 text-body-3 text-gray-600 bg-gray-100 leading-relaxed">
                    {faq.question_answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-16 h-16 rounded-full bg-[#1E1E1E] text-white text-body-3 font-semibold shadow-lg hover:bg-[#333] transition-colors flex items-center justify-center cursor-pointer"
      >
        FAQ
      </button>
    </div>
  );
}
