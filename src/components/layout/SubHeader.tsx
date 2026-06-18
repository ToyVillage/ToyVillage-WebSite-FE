import Image, { StaticImageData } from 'next/image';

interface SubHeaderProps {
  title: string;
  subtitle?: string;
  imageSrc?: StaticImageData;
  imageAlt?: string;
}

export default function SubHeader({ 
  title, 
  subtitle, 
  imageSrc, 
  imageAlt = '' 
}: SubHeaderProps) {
  return (
    <div className="relative w-full h-48 md:h-80 overflow-hidden">
      {imageSrc ? <Image src={imageSrc} alt={imageAlt} fill className="object-cover" /> : null}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-xl md:text-title-2 font-bold text-white mb-1">{title}</h1>
        <p className="text-sm md:text-subtitle-3 text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}
