import Image from 'next/image';
import Link from 'next/link';
import Capybara from '@/assets/animals/Capybara.png';
import NewsList from '@/components/domain/news/NewsList';
import Sprout from '@/assets/Sprout.svg';
import EventList from '@/components/domain/events/EventList';

export default function Home() {
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

      <section className="w-full bg-white p-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-title-3 font-bold flex items-center gap-2">
            <span className="text-main-forest-green">토이빌리지</span> 새소식
            <img src={Sprout.src} alt="" aria-hidden="true" />
          </h2>
          <Link href="/news" className="text-body-3 text-gray-400 hover:text-black">
            더 보러가기 &gt;
          </Link>
        </div>
        <NewsList
          //서버 데이터
          items={[
            {
              id: 1,
              news_title: '뉴스제목1',
              news_description: '뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용.',
              news_postdate: '2025-XX-XX',
            },
            {
              id: 2,
              news_title: '뉴스제목2',
              news_description: '뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용.',
              news_postdate: '2025-XX-XX',
            },
            {
              id: 3,
              news_title: '뉴스제목3',
              news_description: '뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용.',
              news_postdate: '2025-XX-XX',
            },
            {
              id: 4,
              news_title: '뉴스제목3',
              news_description: '뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용.',
              news_postdate: '2025-XX-XX',
            },
          ]}
        />
        <div className="flex justify-between items-center mt-[126px] mb-6">
          <h2 className="text-title-3 font-bold flex items-center gap-2">
            <span className="text-main-forest-green">토이빌리지</span> 이벤트
            <img src={Sprout.src} alt="" aria-hidden="true" />
          </h2>
          <Link href="/events" className="text-body-3 text-gray-400 hover:text-black">
            더 보러가기 &gt;
          </Link>
        </div>
        <EventList 
          items={[
            {
              event_id: 1,
              event_name: "이벤트명",
              event_description: "이벤트 소개",
              event_start_date: "2026-02-06T19:56:53.62201",
              event_end_date: "2026-02-07T19:56:53.62201",
              event_subjects: "이벤트 대상자",
              event_image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400"
            },
            {
              event_id: 2,
              event_name: "이벤트명",
              event_description: "이벤트 소개",
              event_start_date: "2026-02-06T19:56:53.62201",
              event_end_date: "2026-02-08T19:56:53.62201",
              event_subjects: "이벤트 대상자",
              event_image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400"
            },
            {
              event_id: 3,
              event_name: "이벤트명",
              event_description: "이벤트 소개",
              event_start_date: "2026-02-06T19:56:53.62201",
              event_end_date: "2026-02-08T19:56:53.62201",
              event_subjects: "이벤트 대상자",
              event_image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400"
            },
          ]} 
        />
      </section>
    </main>
  );
}
