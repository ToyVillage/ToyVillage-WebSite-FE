interface SliderRowProps {
  images: string[];
  direction: 'left' | 'right';
}

function repeatToFill(images: string[], minCount = 12): string[] {
  if (!images.length) return [];
  const result: string[] = [];
  while (result.length < minCount) result.push(...images);
  return result;
}

function SliderRow({ images, direction }: SliderRowProps) {
  const base = repeatToFill(images);
  const duplicated = [...base, ...base];

  return (
    <div className="overflow-hidden">
      <div className={`flex w-max ${direction === 'left' ? 'animate-slide-left' : 'animate-slide-right'}`}>
        {duplicated.map((url, i) => (
          <div key={i} className="w-55 h-55 shrink-0 overflow-hidden rounded-xl mr-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" loading="lazy" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface AnimalSliderSectionProps {
  row1: string[];
  row2: string[];
}

export default function AnimalSliderSection({ row1, row2 }: AnimalSliderSectionProps) {
  return (
    <section className="py-8 flex flex-col gap-5 overflow-hidden">
      <SliderRow images={row1} direction="right" />
      <SliderRow images={row2} direction="left" />
    </section>
  );
}
