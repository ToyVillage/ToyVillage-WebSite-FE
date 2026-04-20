import Image from "next/image";
import Link from "next/link";

export interface NewsCardItem {
  id: number;
  news_title: string;
  news_description: string;
  news_postdate: string;
  news_image_url: string;
}

interface NewsCardGridProps {
  items: NewsCardItem[];
}

function isValidImageUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/");
}

export default function NewsCardGrid({ items }: NewsCardGridProps) {
  return (
    <ul className="grid grid-cols-3 gap-7">
      {items.map((item) => (
        <li key={item.id} className="flex flex-col">
          <div className="relative w-full h-55 rounded-xl overflow-hidden mb-3">
            {isValidImageUrl(item.news_image_url) ? (
              <Image src={item.news_image_url} alt={item.news_title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
          <p className="text-subtitle-2 text-black mb-1 line-clamp-2">{item.news_title}</p>
          <div className="flex items-center justify-between mt-1">
            <Link href={`/news/${item.id}`} className="text-body-3 text-gray-400 hover:text-black">
              자세히 &gt;
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
