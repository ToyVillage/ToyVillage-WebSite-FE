import axios from 'axios';

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const BASE_URL = 'http://localhost:4000';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const newsApi = {
  getAll: () => api.get('/news').then((res) => res.data),
};
