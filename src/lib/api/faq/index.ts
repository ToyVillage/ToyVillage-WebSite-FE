import { adminApi, userApi } from '@/lib/axios';

export interface FaqItem {
  question_id: number;
  question_content: string;
  question_answer: string;
}

export interface FaqRequest {
  question_content: string;
  question_answer: string;
}

export async function getFaqs(): Promise<FaqItem[]> {
  const { data } = await userApi.get<{ content: FaqItem[] } | FaqItem[]>('/faq');
  return Array.isArray(data) ? data : data.content;
}

export async function getFaqById(id: number): Promise<FaqItem> {
  const { data } = await adminApi.get<FaqItem>(`/faq/${id}`);
  return data;
}

export async function createFaq(body: FaqRequest): Promise<FaqItem> {
  const { data } = await adminApi.post<FaqItem>('/faq', body);
  return data;
}

export async function updateFaq(id: number, body: FaqRequest): Promise<FaqItem> {
  const { data } = await adminApi.put<FaqItem>(`/faq/${id}`, body);
  return data;
}

export async function deleteFaq(id: number): Promise<void> {
  await adminApi.delete(`/faq/${id}`);
}
