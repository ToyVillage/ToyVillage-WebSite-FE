import Image, { StaticImageData } from 'next/image';

interface AdminSubHeaderProps {
  title: string;
  subtitle: string;
  imageSrc?: StaticImageData;
  imageAlt?: string;
}

export default function AdminSubHeader({
  title,
  subtitle,
  imageSrc,
  imageAlt = '',
}: AdminSubHeaderProps) {
  return (
    <div className="relative w-full h-120 overflow-hidden">
      {imageSrc ? <Image src={imageSrc} alt={imageAlt} fill className="object-cover" /> : null}
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <h1 className="text-title-2 font-bold text-white mb-1">{title}</h1>
        <p className="text-title-1 text-white">{subtitle}</p>
      </div>
    </div>
  );
}
