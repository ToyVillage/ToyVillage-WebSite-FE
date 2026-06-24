import Link from "next/link";

function formatDate(iso: string) {
  return iso?.slice(0, 10).replace(/-/g, '.') ?? '';
}

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  postdate: string;
  file_keys: string[];
}

interface NoticeListProps {
  items: NewsItem[];
}

export function NewsList({ items }: NoticeListProps) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-10 text-gray-400 text-body-3 border border-gray-200 rounded-xl p-4 shadow-md">
        등록된 새소식이 없습니다.
      </div>
    );
  }

  return (
    <section aria-label="새소식 목록" className="border border-gray-200 rounded-xl p-4 shadow-md">
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="border-b-2 border-dashed border-gray-200"
          >
            <Link
              href={`/news/${item.id}`}
              className="flex justify-between items-center hover:bg-gray-50 px-8 py-4.5"
            >
              <span className="text-subtitle-2 text-black truncate mr-8">{item.title}</span>
              <time dateTime={item.postdate} className="text-subtitle-3 text-gray-400 shrink-0">
                {formatDate(item.postdate)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
