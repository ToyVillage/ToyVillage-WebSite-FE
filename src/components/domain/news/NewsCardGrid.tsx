'use client';

import Image from "next/image";
import Link from "next/link";
import EditButton from "@/components/domain/admin/EditButton";
import { IMAGE_BASE_URL } from "@/lib/api/file";

export interface NewsCardItem {
  id: number;
  title: string;
  description: string;
  postdate: string;
  file_keys: string[];
}

interface NewsCardGridProps {
  items: NewsCardItem[];
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
}

export default function NewsCardGrid({ items, isAdmin = false, onDelete }: NewsCardGridProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
      {items.map((item) => {
        const imageUrl = item.file_keys[0] ? IMAGE_BASE_URL + item.file_keys[0] : '';
        return (
          <li key={item.id} className="flex flex-col">
            <div className="relative w-full h-55 rounded-xl overflow-hidden mb-3">
              {imageUrl ? (
                <Image src={imageUrl} alt={item.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-subtitle-1 text-black line-clamp-2 flex-1 mr-2">{item.title}</p>
              {isAdmin && (
                <EditButton id={item.id} basePath="/admin/news" onDelete={() => onDelete?.(item.id)} />
              )}
            </div>
            {!isAdmin && (
              <div className="flex items-center justify-between mt-1">
                <Link
                  href={`/news/${item.id}`}
                  aria-label={`${item.title} 자세히 보기`}
                  className="text-body-3 text-gray-400 hover:text-black"
                >
                  자세히 &gt;
                </Link>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
