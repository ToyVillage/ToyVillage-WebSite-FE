import type { Metadata } from 'next';
import { NewsContent } from './_components/NewsContent';

export const metadata: Metadata = {
  title: '새소식',
  description: '토이 빌리지의 최신 새소식을 확인하세요.',
};

export default function NewsPage() {
  return <NewsContent />;
}
