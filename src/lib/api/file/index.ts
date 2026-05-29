import { adminApi } from '@/lib/axios';

export const IMAGE_BASE_URL = 'https://pub-91b94b16deac40029adab73a12cc5e79.r2.dev/';

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
