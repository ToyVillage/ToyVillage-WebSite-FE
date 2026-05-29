import Image from 'next/image';
import Link from 'next/link';
import SubHeader from '@/components/layout/SubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import { getNewsById } from '@/lib/api/news';
import { IMAGE_BASE_URL } from '@/lib/api/file';

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const news = await getNewsById(Number(id));
  const imageUrl = news.file_keys[0] ? IMAGE_BASE_URL + news.file_keys[0] : '';

  return (
    <main>
      <SubHeader
        title={news.title}
        subtitle={news.postdate}
        imageSrc={chinchilla}
        imageAlt={news.title}
      />
      <section className="px-20 py-20">
        {imageUrl && (
          <div className="relative w-full h-109.75 rounded-2xl overflow-hidden mb-8">
            <Image src={imageUrl} alt={news.title} fill className="object-cover" unoptimized />
          </div>
        )}
        <p className="text-body-2 text-black leading-relaxed">{news.description}</p>
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
