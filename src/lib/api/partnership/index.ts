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
  file_keys?: string[];
}

export interface PartnershipDetail {
  id: number;
  partnership_title: string;
  partnership_email: string;
  partnership_phone_number: string;
  partnership_created_at: string;
  partnership_content: string;
  partnership_type: string;
  partnership_file_keys: string[];
}

export async function getPartnerships(): Promise<PartnershipItem[]> {
  const { data } = await adminApi.get<{ content: PartnershipItem[] } | PartnershipItem[]>('/partnership');
  return Array.isArray(data) ? data : data.content;
}

export async function getPartnershipById(id: number): Promise<PartnershipDetail> {
  const { data } = await adminApi.get<PartnershipDetail>(`/partnership/${id}`);
  return data;
}

export async function createPartnership(body: PartnershipRequest): Promise<void> {
  await userApi.post('/partnership', body);
}
