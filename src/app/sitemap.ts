import type { MetadataRoute } from 'next';
import { getEvents } from '@/lib/api/events';
import { getNewsList } from '@/lib/api/news';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://toyvillage.kr';

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, changeFrequency: 'daily', priority: 1.0 },
  { url: `${BASE_URL}/events`, changeFrequency: 'daily', priority: 0.8 },
  { url: `${BASE_URL}/news`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/gallery`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/animals`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/partnership`, changeFrequency: 'monthly', priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [eventsResult, newsResult] = await Promise.allSettled([
    getEvents(0, 1000),
    getNewsList(0, 1000),
  ]);

  const eventRoutes: MetadataRoute.Sitemap =
    eventsResult.status === 'fulfilled'
      ? eventsResult.value.content.map((event) => ({
          url: `${BASE_URL}/events/${event.eventId}`,
          lastModified: new Date(event.eventStartDate),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }))
      : [];

  const newsRoutes: MetadataRoute.Sitemap =
    newsResult.status === 'fulfilled'
      ? newsResult.value.content.map((news) => ({
          url: `${BASE_URL}/news/${news.id}`,
          lastModified: news.postdate ? new Date(news.postdate) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }))
      : [];

  return [...staticRoutes, ...eventRoutes, ...newsRoutes];
}
