import { adminApi, userApi } from '@/lib/axios';

export const IMAGE_BASE_URL = 'https://cdn.toyvillage.kr/';

export interface FileUploadResponse {
  fileKey: string;
  fileUrl: string;
}

export async function uploadFile(file: File): Promise<FileUploadResponse> {
  const formData = new FormData();
  formData.append('files', file);
  const { data } = await adminApi.post<{ fileKey: string }>('/file', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return { fileKey: data.fileKey, fileUrl: IMAGE_BASE_URL + data.fileKey };
}

export async function uploadFilePublic(file: File): Promise<FileUploadResponse> {
  const formData = new FormData();
  formData.append('files', file);
  const { data } = await userApi.post<{ fileKey: string }>('/file', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return { fileKey: data.fileKey, fileUrl: IMAGE_BASE_URL + data.fileKey };
}
