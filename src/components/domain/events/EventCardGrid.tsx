import Image from "next/image";
import Link from "next/link";

export interface EventCardItem {
  event_id: number;
  event_name: string;
  event_description: string;
  event_start_date: string;
  event_end_date: string;
  event_subjects: string;
  event_image_url: string;
}

interface EventCardGridProps {
  items: EventCardItem[];
}

function isValidImageUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/");
}

function formatEventDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default function EventCardGrid({ items }: EventCardGridProps) {
  return (
    <ul className="grid grid-cols-3 gap-7">
      {items.map((item) => (
        <li key={item.event_id} className="flex flex-col">
          <div className="relative w-full h-55 rounded-xl overflow-hidden mb-2">
            {isValidImageUrl(item.event_image_url) ? (
              <Image src={item.event_image_url} alt={item.event_name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
          <p className="text-subtitle-1 text-black mb-1 line-clamp-2">{item.event_name}</p>
          <span className="text-body-3 text-gray-400 mb-1">
            {formatEventDate(item.event_start_date)} ~ {formatEventDate(item.event_end_date)}
          </span>
          <Link
            href={`/events/${item.event_id}`}
            aria-label={`${item.event_name} 자세히 보기`}
            className="flex items-center gap-1 text-body-3 text-gray-400 hover:text-black"
          >
            자세히 <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-400 text-[10px]">&gt;</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
