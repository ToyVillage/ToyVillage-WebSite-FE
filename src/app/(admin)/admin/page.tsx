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

export const metadata: Metadata = { title: '토이빌리지 | 관리자' };

const cards = [
  { title: '동물 소개', href: '/admin/animals', imageSrc: animalsIcon, imageAlt: '동물 소개 바로가기 일러스트' },
  { title: '이벤트', href: '/admin/events', imageSrc: giftIcon, imageAlt: '이벤트 바로가기 일러스트' },
  { title: '갤러리', href: '/admin/gallery', imageSrc: pictureIcon, imageAlt: '갤러리 바로가기 일러스트' },
  { title: '뉴스', href: '/admin/news', imageSrc: newsIcon, imageAlt: '뉴스 바로가기 일러스트' },
  { title: '제휴문의', href: '/admin/partnership', imageSrc: handsIcon, imageAlt: '제휴문의 바로가기 일러스트' },
];

export default function Admin() {
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
          <AnimalSliderSection
            row1={[
              'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400',
              'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400',
              'https://images.unsplash.com/photo-1527980965560-1e2bde8f0ec0?w=400',
              'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=400',
              'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400',
              'https://images.unsplash.com/photo-1507888843-4e0ba8d5b74d?w=400',
              'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400',
            ]}
            row2={[
              'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400',
              'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400',
              'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400',
              'https://images.unsplash.com/photo-1437622368342-7a3d73a3a2f3?w=400',
              'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400',
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
            ]}
          />
        </section>
      </main>
    </>
  );
}
