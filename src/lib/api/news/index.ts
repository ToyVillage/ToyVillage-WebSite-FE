import { userApi, adminApi } from '@/lib/axios';
import { SpringPage } from '@/lib/api/events';

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  postdate: string;
  file_keys: string[];
}

export interface NewsRequest {
  news_title: string;
  news_description: string;
  file_keys: string[];
}

export async function getNewsList(page: number, size: number = 8): Promise<SpringPage<NewsItem>> {
  const { data } = await userApi.get<SpringPage<NewsItem>>('/news', {
    params: { page, size },
  });
  return data;
}

export async function getNewsById(id: number): Promise<NewsItem> {
  const { data } = await userApi.get<NewsItem>(`/news/${id}`);
  return data;
}

export async function createNews(body: NewsRequest): Promise<NewsItem> {
  const { data } = await adminApi.post<NewsItem>('/news', body);
  return data;
}

export async function updateNews(id: number, body: NewsRequest): Promise<NewsItem> {
  const { data } = await adminApi.put<NewsItem>(`/news/${id}`, body);
  return data;
}

export async function deleteNews(id: number): Promise<void> {
  await adminApi.delete(`/news/${id}`);
}
