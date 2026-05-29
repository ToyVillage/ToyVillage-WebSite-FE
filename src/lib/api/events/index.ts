import { userApi, adminApi } from '@/lib/axios';

export interface EventItem {
  eventId: number;
  eventName: string;
  eventDescription: string;
  eventStartDate: string;
  eventEndDate: string;
  eventSubjects: string;
  fileKey: string;
}

export interface SpringPage<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export interface EventRequest {
  event_name: string;
  event_description: string;
  event_start_date: string;
  event_end_date: string;
  event_subjects: string;
  file_key: string;
}

export async function getEvents(page: number): Promise<SpringPage<EventItem>> {
  const { data } = await userApi.get<SpringPage<EventItem>>('/events', {
    params: { page, size: 8 },
  });
  return data;
}

export async function getEventById(id: number): Promise<EventItem> {
  const { data } = await userApi.get<EventItem>(`/events/${id}`);
  return data;
}

export async function createEvent(body: EventRequest): Promise<EventItem> {
  const { data } = await adminApi.post<EventItem>('/events', body);
  return data;
}

export async function updateEvent(id: number, body: EventRequest): Promise<EventItem> {
  const { data } = await adminApi.put<EventItem>(`/events/${id}`, body);
  return data;
}

export async function deleteEvent(id: number): Promise<void> {
  await adminApi.delete(`/events/${id}`);
}
