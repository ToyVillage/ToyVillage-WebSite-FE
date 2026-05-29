import { userApi, adminApi } from '@/lib/axios';
import { SpringPage } from '@/lib/api/events';

export interface GalleryItem {
  gallery_id: number;
  gallery_title: string;
  gallery_file_key: string;
}

export interface GalleryRequest {
  gallery_title: string;
  file_key?: string;
}

export async function getGalleries(page: number): Promise<SpringPage<GalleryItem>> {
  const { data } = await userApi.get<SpringPage<GalleryItem> | GalleryItem[]>('/gallery', {
    params: { page, size: 8 },
  });
  if (Array.isArray(data)) {
    return { content: data, totalPages: 1, totalElements: data.length, number: 0, size: data.length };
  }
  return { ...data, content: data.content ?? [] };
}

export async function getGalleryById(id: number): Promise<GalleryItem> {
  const { data } = await userApi.get<GalleryItem>(`/gallery/${id}`);
  return data;
}

export async function createGallery(body: GalleryRequest): Promise<GalleryItem> {
  const { data } = await adminApi.post<GalleryItem>('/gallery', body);
  return data;
}

export async function updateGallery(id: number, body: GalleryRequest): Promise<GalleryItem> {
  const { data } = await adminApi.put<GalleryItem>(`/gallery/${id}`, body);
  return data;
}

export async function deleteGallery(id: number): Promise<void> {
  await adminApi.delete(`/gallery/${id}`);
}
