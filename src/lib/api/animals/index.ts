import { adminApi, userApi } from '@/lib/axios';
import { IMAGE_BASE_URL } from '@/lib/api/file';

export interface AnimalItem {
  id?: number;
  animal_kind: string;
  animal_description: string;
  animal_type: string;
  animal_image: string;
  popular_animal: boolean;
}

export interface AnimalListResponse {
  popular_animal: AnimalItem[];
  mammals: AnimalItem[];
  reptiles: AnimalItem[];
  fish: AnimalItem[];
  birds: AnimalItem[];
}

const withImageUrl = (a: AnimalItem): AnimalItem => ({
  ...a,
  animal_image: a.animal_image && !a.animal_image.startsWith('http')
    ? IMAGE_BASE_URL + a.animal_image
    : a.animal_image,
});

const applyUrls = (items: AnimalItem[]) => items.map(withImageUrl);

export async function getAnimals(): Promise<AnimalListResponse> {
  const { data } = await userApi.get<AnimalListResponse>('/animal');
  return {
    popular_animal: applyUrls(data.popular_animal ?? []),
    mammals: applyUrls(data.mammals ?? []),
    reptiles: applyUrls(data.reptiles ?? []),
    fish: applyUrls(data.fish ?? []),
    birds: applyUrls(data.birds ?? []),
  };
}

export async function getAnimalById(id: number): Promise<AnimalItem> {
  const { data } = await adminApi.get<AnimalItem>(`/animal/${id}`);
  return withImageUrl(data);
}

export async function createAnimal(formData: FormData): Promise<AnimalItem> {
  const { data } = await adminApi.post<AnimalItem>('/animal', formData);
  return data;
}

export async function updateAnimal(id: number, formData: FormData): Promise<AnimalItem> {
  const { data } = await adminApi.put<AnimalItem>(`/animal/${id}`, formData);
  return data;
}

export async function deleteAnimal(id: number): Promise<void> {
  await adminApi.delete(`/animal/${id}`);
}
