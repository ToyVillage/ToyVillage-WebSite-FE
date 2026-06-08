'use client';

import Image from "next/image";
import Link from "next/link";
import EditButton from "@/components/domain/admin/EditButton";
import { IMAGE_BASE_URL } from "@/lib/api/file";

export interface EventCardItem {
  eventId: number;
  eventName: string;
  eventDescription: string;
  eventStartDate: string;
  eventEndDate: string;
  eventSubjects: string;
  fileKey: string;
}

interface EventCardGridProps {
  items: EventCardItem[];
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
}

function formatEventDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default function EventCardGrid({ items, isAdmin = false, onDelete }: EventCardGridProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
      {items.map((item) => {
        const imageUrl = item.fileKey ? IMAGE_BASE_URL + item.fileKey : null;
        return (
          <li key={item.eventId} className="flex flex-col">
            <div className="relative w-full h-55 rounded-xl overflow-hidden mb-2">
              {imageUrl != null ? (
                <Image src={imageUrl} alt={item.eventName ?? ''} fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-subtitle-1 text-black line-clamp-2 flex-1 mr-2">{item.eventName}</p>
              {isAdmin && (
                <EditButton id={item.eventId} basePath="/admin/events" onDelete={() => onDelete?.(item.eventId)} />
              )}
            </div>
            <span className="text-body-3 text-gray-400 mb-1">
              {formatEventDate(item.eventStartDate)} ~ {formatEventDate(item.eventEndDate)}
            </span>
            {!isAdmin && (
              <Link
                href={`/events/${item.eventId}`}
                aria-label={`${item.eventName} 자세히 보기`}
                className="flex items-center gap-1 text-body-3 text-gray-400 hover:text-black"
              >
                자세히 <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-400 text-[10px]">&gt;</span>
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
