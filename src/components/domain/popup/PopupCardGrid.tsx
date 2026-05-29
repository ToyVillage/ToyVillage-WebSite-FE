import Image from 'next/image';
import EditButton from '@/components/domain/admin/EditButton';

export interface PopupCardItem {
  popup_id: number;
  popup_imageurl: string;
  popup_start_date: string;
  popup_end_date: string;
}

interface PopupCardGridProps {
  items: PopupCardItem[];
  isAdmin?: boolean;
}

function isValidImageUrl(url: string) {
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
}

export default function PopupCardGrid({ items, isAdmin = false }: PopupCardGridProps) {
  return (
    <ul className="grid grid-cols-4 gap-5">
      {items.map((item) => (
        <li key={item.popup_id} className="flex flex-col gap-2">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-200">
            {isValidImageUrl(item.popup_imageurl) && (
              <Image
                src={item.popup_imageurl}
                alt="팝업 이미지"
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-body-3 text-black">
              {item.popup_start_date} ~ {item.popup_end_date}
            </p>
            {isAdmin && <EditButton id={item.popup_id} basePath="/admin/popup" />}
          </div>
        </li>
      ))}
    </ul>
  );
}
