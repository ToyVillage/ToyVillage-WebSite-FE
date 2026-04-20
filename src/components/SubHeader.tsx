import Image, { StaticImageData } from 'next/image';

interface SubHeaderProps {
  title: string;
  subtitle: string;
  imageSrc?: StaticImageData;
  imageAlt?: string;
}

export default function SubHeader({ title, subtitle, imageSrc, imageAlt = '' }: SubHeaderProps) {
  return (
    <div className="relative w-full h-80 overflow-hidden">
      {imageSrc ? <Image src={imageSrc} alt={imageAlt} fill className="object-cover" /> : null}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 to-[#151515]/0" />
      <div className="absolute top-40 flex flex-col justify-center px-[86px]">
        <h1 className="text-title-2 font-bold text-white mb-1">{title}</h1>
        <p className="text-subtitle-3 text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}
