import Image from 'next/image';
import Link from 'next/link';

interface AdminCardItemProps {
  title: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function AdminCardItem({ title, href, imageSrc, imageAlt }: AdminCardItemProps) {
  return (
    <Link className="overflow-hidden rounded-[20px]" href={href} aria-label={`${title} 바로가기`}>
      <section className="flex h-[404px] w-80 flex-col gap-[74px] overflow-hidden rounded-[20px] bg-white cursor-pointer">
        <h1 className="ml-11 mt-11 h-[86px] [font-family:'Pretendard-Bold',Helvetica] text-4xl font-bold leading-[normal] tracking-[0] text-black">
          <span className="block">{title}</span>
          <span className="block">바로가기</span>
        </h1>
        <div className="ml-[83px] h-[200px] w-[237px]">
          {imageSrc ? (
            <Image
              className="h-[200px] w-[237px] aspect-[1.13]"
              alt={imageAlt ?? title}
              src={imageSrc}
            />
          ) : (
            <div className="h-[200px] w-[237px] rounded-2xl bg-gray-100" />
          )}
        </div>
      </section>
    </Link>
  );
}
