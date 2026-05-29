'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 rounded-full text-body-3 transition-colors cursor-pointer ${
            page === currentPage
              ? 'bg-main-forest-green text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
