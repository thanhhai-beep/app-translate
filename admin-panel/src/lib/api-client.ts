import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQ0Nzg0Nzk1LCJleHAiOjE3NDQ4NzExOTV9.Ef9ltX_wXrC6EV0ixjsXs2phQlfHTzebazt1Wame4So";
  config.headers = config.headers || {};
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});
