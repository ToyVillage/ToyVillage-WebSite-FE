import { adminApi, userApi } from '@/lib/axios';

export interface PartnershipItem {
  id: number;
  title: string;
  received_Date: string;
}

export interface PartnershipRequest {
  partnershipType: 'MARKETING' | 'STORE_OPENING' | 'OTHER';
  title: string;
  name: string;
  email: string;
  phoneNumber: string;
  content: string;
}

export async function getPartnerships(): Promise<PartnershipItem[]> {
  const { data } = await adminApi.get<{ content: PartnershipItem[] } | PartnershipItem[]>('/partnership');
  return Array.isArray(data) ? data : data.content;
}

export async function createPartnership(body: PartnershipRequest): Promise<void> {
  await userApi.post('/partnership', body);
}
