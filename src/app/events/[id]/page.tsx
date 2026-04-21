import Image from 'next/image';
import Link from 'next/link';
import SubHeader from '@/components/layout/SubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';

interface EventsDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventsDetailPage({ params }: EventsDetailPageProps) {
  const { id } = await params;

  // 서버 데이터
  const events = {
    event_id: id,
    event_name: '추석 연휴 휴관 안내',
    news_description:
      '이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다 이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다',
    news_image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900',
    event_start_date: '2026-02-06T19:56:53.62201',
    event_end_date: '2026-02-06T19:56:53.62201',
    event_subjects: '이벤트 대상자',
  };

  return (
    <main>
      <SubHeader
        title={events.event_name}
        subtitle={(() => {
          const s = new Date(events.event_start_date);
          const e = new Date(events.event_end_date);
          return `${s.getFullYear()} ${s.getMonth() + 1}/${s.getDate()} ~ ${e.getMonth() + 1}/${e.getDate()}`;
        })()}
        imageSrc={chinchilla}
        imageAlt={events.event_name}
      />

      <section className="px-20 py-20">
        <div className="relative w-full h-[439px] rounded-2xl overflow-hidden mb-8">
          <Image
            src={events.news_image_url}
            alt={events.event_name}
            fill
            className="object-cover"
          />
        </div>

        <p className="text-body-2 text-black leading-relaxed">{events.news_description}</p>

        <div className="flex justify-end mt-16">
          <Link
            href="/events"
            className="px-8 py-4 rounded-xl border border-gray-300 text-body-2 text-black hover:bg-gray-50 transition-colors"
          >
            뒤로가기
          </Link>
        </div>
      </section>
    </main>
  );
}
