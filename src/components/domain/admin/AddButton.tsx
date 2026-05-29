import Link from 'next/link';

interface AddButtonProps {
  href: string;
}

export default function AddButton({ href }: AddButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-1 px-10 py-4 relative bg-[#3a7d44] rounded-[64px] overflow-hidden
      cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a7d44]"
      aria-label="추가하기"
    >
      <span className="relative w-fit text-subtitle-1 text-white whitespace-nowrap">
        + 추가하기
      </span>
    </Link>
  );
};
