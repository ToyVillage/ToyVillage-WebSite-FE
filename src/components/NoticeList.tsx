export interface NewsItem {
  id: number;
  news_title: string;
  news_description: string;
  news_postdate: string;
}

interface NoticeListProps {
  items: NewsItem[];
}

export default function NoticeList({ items }: NoticeListProps) {
  return (
    <section aria-label="새소식 목록" className="border border-gray-200 rounded-xl p-4 shadow-md">
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b-2 border-dashed border-gray-200 hover:bg-gray-50 cursor-pointer px-[32px] py-[18px]"
          >
            <span className="text-subtitle-2 text-black truncate mr-8 ">{item.news_title}</span>
            <time dateTime={item.news_postdate} className="text-subtitle-3 text-gray-400 shrink-0">
              {item.news_postdate}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
}
