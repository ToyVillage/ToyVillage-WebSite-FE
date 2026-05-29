import { Metadata } from 'next';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import AdminCardItem from '@/components/domain/admin/AdminCardItem';
import animalsIcon from '@/assets/admin/animalsIcon.svg';
import giftIcon from '@/assets/admin/giftIcon.svg';
import pictureIcon from '@/assets/admin/pictureIcon.svg';
import newsIcon from '@/assets/admin/newsIcon.svg';
import handsIcon from '@/assets/admin/handsIcon.svg';
import AnimalSliderSection from '@/components/layout/AnimalSliderSection';
import { getAnimals } from '@/lib/api/animals';
import { getGalleries } from '@/lib/api/gallery';
import { IMAGE_BASE_URL } from '@/lib/api/file';

export const metadata: Metadata = { title: '토이빌리지 | 관리자' };

const cards = [
  { title: '동물 소개', href: '/admin/animals', imageSrc: animalsIcon, imageAlt: '동물 소개 바로가기 일러스트' },
  { title: '이벤트', href: '/admin/events', imageSrc: giftIcon, imageAlt: '이벤트 바로가기 일러스트' },
  { title: '갤러리', href: '/admin/gallery', imageSrc: pictureIcon, imageAlt: '갤러리 바로가기 일러스트' },
  { title: '뉴스', href: '/admin/news', imageSrc: newsIcon, imageAlt: '뉴스 바로가기 일러스트' },
  { title: '제휴문의', href: '/admin/partnership', imageSrc: handsIcon, imageAlt: '제휴문의 바로가기 일러스트' },
];

export default async function Admin() {
  const [galleriesResult, animalsResult] = await Promise.allSettled([
    getGalleries(0),
    getAnimals(),
  ]);

  const galleryImages = galleriesResult.status === 'fulfilled'
    ? galleriesResult.value.content
        .filter((g) => g.gallery_file_key)
        .map((g) => IMAGE_BASE_URL + g.gallery_file_key)
    : [];

  const animalImages = animalsResult.status === 'fulfilled'
    ? [
        ...animalsResult.value.mammals,
        ...animalsResult.value.reptiles,
        ...animalsResult.value.fish,
        ...animalsResult.value.birds,
      ]
        .filter((a) => a.animal_image)
        .map((a) => a.animal_image)
    : [];

  const allSliderImages = [...animalImages, ...galleryImages];
  const sliderRow1 = allSliderImages.filter((_, i) => i % 2 === 0);
  const sliderRow2 = allSliderImages.filter((_, i) => i % 2 !== 0);

  return (
    <>
      <AdminSubHeader imageSrc={chinchilla} title="관리자" subtitle="Toy Village Admin" />
      <main className="w-full py-12">
        <div className="flex gap-5 flex-nowrap justify-center overflow-x-auto px-20 pb-4 scrollbar-hide">
          {cards.map((card) => (
            <AdminCardItem key={card.title} {...card} />
          ))}
        </div>
        <section className="w-full mt-24">
          <div className="flex flex-col items-center">
            <p className="text-title-3 text-black">가까이서 만나고,</p>
            <p className="text-title-3 text-black">직접 체험하며 즐기는</p>
            <p className="text-title-1 font-bold text-black">Toy Village</p>
          </div>
          <AnimalSliderSection row1={sliderRow1} row2={sliderRow2} />
        </section>
      </main>
    </>
  );
}
