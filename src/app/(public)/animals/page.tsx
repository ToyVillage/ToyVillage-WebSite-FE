import type { Metadata } from 'next';
import { AnimalsContent } from './_components/AnimalsContent';

export const metadata: Metadata = {
  title: '동물 소개',
  description: '토이 빌리지에서 만날 수 있는 다양한 동물 친구들을 소개합니다.',
};

export default function AnimalPage() {
  return <AnimalsContent />;
}
