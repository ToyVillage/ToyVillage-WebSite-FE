'use client';

import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EditButton from "@/components/domain/admin/EditButton";
import { IMAGE_BASE_URL } from "@/lib/api/file";
import { deleteGallery } from "@/lib/api/gallery";

export interface GalleryCardItem {
  gallery_id: number;
  gallery_title: string;
  gallery_file_key: string;
}

interface GalleryCardGridProps {
  items: GalleryCardItem[];
  isAdmin?: boolean;
}

export default function GalleryCardGrid({ items, isAdmin = false }: GalleryCardGridProps) {
  const queryClient = useQueryClient();
  const { mutate: remove } = useMutation({
    mutationFn: (id: number) => deleteGallery(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gallery'] }),
  });

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-body-3">
        등록된 갤러리가 없습니다.
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 items-start">
      {items.map((item) => (
        <li key={item.gallery_id} className="flex flex-col gap-3">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
            {item.gallery_file_key ? (
              <Image
                src={IMAGE_BASE_URL + item.gallery_file_key}
                alt={item.gallery_title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
          <div className="flex items-start justify-between w-full">
            <p className="text-body-2 text-black line-clamp-2 flex-1 mr-2">{item.gallery_title}</p>
            {isAdmin && (
              <EditButton
                id={item.gallery_id}
                basePath="/admin/gallery"
                onDelete={() => {
                  if (confirm('갤러리를 삭제하시겠습니까?')) remove(item.gallery_id);
                }}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
