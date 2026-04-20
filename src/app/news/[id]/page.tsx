import Image from 'next/image';
import Link from 'next/link';
import SubHeader from '@/components/layout/SubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;

  // 서버 데이터
  const news = {
    id,
    news_title: '추석 연휴 휴관 안내',
    news_description:
      '이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다이것은 임시 텍스트입니다',
    news_image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900',
    news_postdate: '2025-XX-XX',
  };

  return (
    <main>
      <SubHeader
        title={news.news_title}
        subtitle={news.news_postdate}
        imageSrc={chinchilla}
        imageAlt={news.news_title}
      />

      <section className="px-20 py-20">
        <div className="relative w-full h-[439px] rounded-2xl overflow-hidden mb-8">
          <Image src={news.news_image_url} alt={news.news_title} fill className="object-cover" />
        </div>

        <p className="text-body-2 text-black leading-relaxed">{news.news_description}</p>

        <div className="flex justify-end mt-16">
          <Link
            href="/news"
            className="px-8 py-4 rounded-xl border border-gray-300 text-body-2 text-black hover:bg-gray-50 transition-colors"
          >
            뒤로가기
          </Link>
        </div>
      </section>
    </main>
  );
}
