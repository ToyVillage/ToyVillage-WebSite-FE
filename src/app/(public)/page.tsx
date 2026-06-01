export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import Capybara from '@/assets/animals/Capybara.png';
import { NewsList } from '@/components/domain/news/NewsList';
import Sprout from '@/assets/Sprout.svg';
import { EventList } from '@/components/domain/events/EventList';
import AnimalSliderSection from '@/components/layout/AnimalSliderSection';
import { getNewsList } from '@/lib/api/news';
import { getEvents } from '@/lib/api/events';
import { getGalleries } from '@/lib/api/gallery';
import { getAnimals } from '@/lib/api/animals';
import { IMAGE_BASE_URL } from '@/lib/api/file';

export default async function Home() {
  const [newsResult, eventsResult, galleriesResult, animalsResult] = await Promise.allSettled([
    getNewsList(0, 5),
    getEvents(0, 3),
    getGalleries(0),
    getAnimals(),
  ]);

  const newsItems = newsResult.status === 'fulfilled' ? newsResult.value.content.slice(0, 5) : [];
  const eventItems = eventsResult.status === 'fulfilled' ? eventsResult.value.content : [];

  const galleryImages =
    galleriesResult.status === 'fulfilled'
      ? galleriesResult.value.content
          .filter((g) => g.gallery_file_key)
          .map((g) => IMAGE_BASE_URL + g.gallery_file_key)
      : [];

  const animalImages =
    animalsResult.status === 'fulfilled'
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
    <main>
      <section className="relative w-full h-195.5 overflow-hidden">
        <Image
          src={Capybara}
          alt="카피바라 가족이 물가에 모여있는 모습"
          placeholder="blur"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/0 via-50% to-black/80 pointer-events-none" />
        <div className="absolute bottom-40 left-30">
          <p className="text-white text-title-2">가까이서 만나고,</p>
          <p className="text-white text-title-1">
            함께 <span className="text-main-green">교감</span>하는 경험
          </p>
        </div>
      </section>

      <section className="w-full p-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-title-3 font-bold flex items-center gap-2">
            <span className="text-main-forest-green">토이빌리지</span> 새소식
            <img src={Sprout.src} alt="" aria-hidden="true" />
          </h2>
          <Link href="/news" className="text-body-3 text-gray-400 hover:text-black">
            더 보러가기 &gt;
          </Link>
        </div>
        <NewsList items={newsItems} />

        <div className="flex justify-between items-center mt-[126px] mb-6">
          <h2 className="text-title-3 font-bold flex items-center gap-2">
            <span className="text-main-forest-green">토이빌리지</span> 이벤트
            <img src={Sprout.src} alt="" aria-hidden="true" />
          </h2>
          <Link href="/events" className="text-body-3 text-gray-400 hover:text-black">
            더 보러가기 &gt;
          </Link>
        </div>
        <EventList items={eventItems} />

        <hr className="w-full mt-14 border-none h-0.5 bg-[#E5E5E5]" />
      </section>

      <section className="w-full">
        <div className="flex flex-col items-center">
          <p className="text-title-3 text-black">가까이서 만나고,</p>
          <p className="text-title-3 text-black">직접 체험하며 즐기는</p>
          <p className="text-title-1 font-bold text-black">Toy Village</p>
        </div>
        <AnimalSliderSection row1={sliderRow1} row2={sliderRow2} />
      </section>
    </main>
  );
}
