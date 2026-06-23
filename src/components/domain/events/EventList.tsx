'use client';

import Image from "next/image";
import Link from "next/link";
import { IMAGE_BASE_URL } from "@/lib/api/file";

export interface EventListItem {
  eventId: number;
  eventName: string;
  eventDescription: string;
  eventStartDate: string;
  eventEndDate: string;
  eventSubjects: string;
  fileKey: string;
}

interface EventListProps {
  items: EventListItem[];
}

function formatEventDate(iso: string) {
  const d = new Date(iso);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}.${mm}.${dd}`;
}

export function EventList({ items }: EventListProps) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-10 text-gray-400 text-body-3">
        등록된 이벤트가 없습니다.
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-7">
      {items.map((item) => {
        const imageUrl = item.fileKey ? IMAGE_BASE_URL + item.fileKey : null;
        return (
          <li key={item.eventId} className="flex flex-col">
            <div className="relative w-full h-55 rounded-xl overflow-hidden mb-2">
              {imageUrl != null ? (
                <Image src={imageUrl} alt={item.eventName ?? ''} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-subtitle-1 text-black line-clamp-2 flex-1 mr-2">{item.eventName}</p>
            </div>
            <span className="text-body-3 text-gray-400 mb-1">
              {formatEventDate(item.eventStartDate)} ~ {formatEventDate(item.eventEndDate)}
            </span>
            <Link
              href={`/events/${item.eventId}`}
              aria-label={`${item.eventName} 자세히 보기`}
              className="flex items-center gap-1 text-body-3 text-gray-400 hover:text-black"
            >
              자세히 <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-400 text-[10px]">&gt;</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
