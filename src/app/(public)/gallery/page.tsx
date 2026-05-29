import type { Metadata } from 'next';
import { GalleryContent } from './_components/GalleryContent';

export const metadata: Metadata = {
  title: '갤러리',
  description: '토이 빌리지의 생생한 사진 갤러리를 감상하세요.',
};

export default function GalleryPage() {
  return <GalleryContent />;
}
