import CardGrid from '@/components/NewsCardGrid';
import SubHeader from '@/components/SubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';

export default function News() {
  return (
    <>
      <SubHeader 
        imageSrc={chinchilla} 
        title="새소식" 
        subtitle="Toy village News" />
      <main className="w-full bg-white px-20 py-12">
        <CardGrid
          items={[
            {
              id: 1,
              news_title: '추석 연휴 휴관 안내',
              news_description: '뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용.',
              news_postdate: '2025-XX-XX',
              news_image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
            },
            {
              id: 2,
              news_title: '추석 연휴 휴관 안내',
              news_description: '뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용.',
              news_postdate: '2025-XX-XX',
              news_image_url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
            },
            {
              id: 3,
              news_title: '추석 연휴 휴관 안내',
              news_description: '뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용.',
              news_postdate: '2025-XX-XX',
              news_image_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
            },
            {
              id: 4,
              news_title: '추석 연휴 휴관 안내',
              news_description: '뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용.',
              news_postdate: '2025-XX-XX',
              news_image_url: '',
            },
            {
              id: 5,
              news_title: '추석 연휴 휴관 안내',
              news_description: '뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용.',
              news_postdate: '2025-XX-XX',
              news_image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
            },
            {
              id: 6,
              news_title: '추석 연휴 휴관 안내',
              news_description: '뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용.',
              news_postdate: '2025-XX-XX',
              news_image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            },
            {
              id: 7,
              news_title: '추석 연휴 휴관 안내',
              news_description: '뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용뉴스내용.',
              news_postdate: '2025-XX-XX',
              news_image_url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400',
            },
          ]}
        />
      </main>
    </>
  );
}
