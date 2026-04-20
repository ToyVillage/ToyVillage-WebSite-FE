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

export default function EventCardGrid({ items }: EventCardGridProps) {
  return (
    <ul className="grid grid-cols-3 gap-7">
      {items.map((item) => (
        <li key={item.event_id} className="flex flex-col">
          <div className="relative w-full h-55 rounded-xl overflow-hidden mb-3">
            {isValidImageUrl(item.event_image_url) ? (
              <Image src={item.event_image_url} alt={item.event_name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
          <p className="text-subtitle-2 text-black mb-1 line-clamp-2">{item.event_name}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-body-3 text-gray-400">{item.event_subjects}</span>
            <Link href={`/event/${item.event_id}`} className="text-body-3 text-gray-400 hover:text-black">
              자세히 &gt;
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
