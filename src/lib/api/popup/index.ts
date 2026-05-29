import { adminApi, userApi } from '@/lib/axios';
import { IMAGE_BASE_URL } from '@/lib/api/file';

export interface PopupItem {
  id: number;
  popupImage: string;
  expirationDate: string;
  priority: number;
}

export interface PopupPageResponse {
  content: PopupItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface PopupRequest {
  file_key: string;
  expiration_date: string;
  priority: number;
}

const withImageUrl = (p: PopupItem): PopupItem => ({
  ...p,
  popupImage: p.popupImage && !p.popupImage.startsWith('http')
    ? IMAGE_BASE_URL + p.popupImage
    : p.popupImage,
});

export async function getActivePopups(): Promise<PopupItem[]> {
  const { data } = await userApi.get<PopupPageResponse | PopupItem[]>('/popup');
  return (Array.isArray(data) ? data : data.content).map(withImageUrl);
}

export async function getPopups(page = 0): Promise<PopupPageResponse> {
  const { data } = await adminApi.get<PopupPageResponse>('/popup', { params: { page, size: 20 } });
  return { ...data, content: data.content.map(withImageUrl) };
}

export async function getPopupById(id: number): Promise<PopupItem> {
  const { data } = await adminApi.get<PopupItem>(`/popup/${id}`);
  return withImageUrl(data);
}

export async function createPopup(body: PopupRequest): Promise<PopupItem> {
  const { data } = await adminApi.post<PopupItem>('/popup', body);
  return data;
}

export async function updatePopup(id: number, body: PopupRequest): Promise<PopupItem> {
  const { data } = await adminApi.patch<PopupItem>(`/popup/${id}`, body);
  return data;
}

export async function deletePopup(id: number): Promise<void> {
  await adminApi.delete(`/popup/${id}`);
}
