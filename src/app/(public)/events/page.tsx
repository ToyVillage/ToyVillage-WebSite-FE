import type { Metadata } from 'next';
import { EventsContent } from './_components/EventsContent';

export const metadata: Metadata = {
  title: '이벤트',
  description: '토이 빌리지의 다양한 이벤트를 확인하세요.',
};

export default function EventsPage() {
  return <EventsContent />;
}
