import type { Metadata } from 'next';
import { PartnershipContent } from './_components/PartnershipContent';

export const metadata: Metadata = {
  title: '제휴 문의',
  description: '토이 빌리지와 함께하고 싶은 파트너를 기다립니다. 제휴 문의를 남겨주세요.',
};

export default function PartnershipPage() {
  return <PartnershipContent />;
}
