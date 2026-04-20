import SubHeader from '@/components/layout/SubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import EventCardGrid from '@/components/domain/events/EventCardGrid';

export default function events() {
  return (
    <>
      <SubHeader imageSrc={chinchilla} title="이벤트" subtitle="Toy village’s Event" />
      <main className="w-full bg-white px-20 py-12">
        <EventCardGrid
          items={[
            {
              event_id: 1,
              event_name: '이벤트명',
              event_description: '이벤트 소개',
              event_start_date: '2026-02-06T19:56:53.62201',
              event_end_date: '2026-02-07T19:56:53.62201',
              event_subjects: '이벤트 대상자',
              event_image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
            },
            {
              event_id: 2,
              event_name: '이벤트명',
              event_description: '이벤트 소개',
              event_start_date: '2026-02-06T19:56:53.62201',
              event_end_date: '2026-02-08T19:56:53.62201',
              event_subjects: '이벤트 대상자',
              event_image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
            },
            {
              event_id: 3,
              event_name: '이벤트명',
              event_description: '이벤트 소개',
              event_start_date: '2026-02-06T19:56:53.62201',
              event_end_date: '2026-02-08T19:56:53.62201',
              event_subjects: '이벤트 대상자',
              event_image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
            },
            {
              event_id: 4,
              event_name: '이벤트명',
              event_description: '이벤트 소개',
              event_start_date: '2026-02-06T19:56:53.62201',
              event_end_date: '2026-02-09T19:56:53.62201',
              event_subjects: '이벤트 대상자',
              event_image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
            },
            {
              event_id: 5,
              event_name: '이벤트명',
              event_description: '이벤트 소개',
              event_start_date: '2026-02-06T19:56:53.62201',
              event_end_date: '2026-02-10T19:56:53.62201',
              event_subjects: '이벤트 대상자',
              event_image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
            },
          ]}
        />
      </main>
    </>
  );
}
