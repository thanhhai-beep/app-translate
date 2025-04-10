import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';
import { message } from 'antd';

interface Manga {
  id: string;
  title: string;
  originalTitle: string;
  description: string;
  author: string;
  status: string;
  coverImage: string;
  createdAt: string;
}

interface MangaResponse {
  data: Manga[];
  total: number;
}

export const useManga = (id: string) => {
  return useQuery<Manga>({
    queryKey: ['manga', id],
    queryFn: async (): Promise<Manga> => {
      const { data } = await apiClient.get<Manga>(`/manga/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useMangas = (page: number = 1, limit: number = 10) => {
  return useQuery<MangaResponse>({
    queryKey: ['mangas', page, limit],
    queryFn: async (): Promise<MangaResponse> => {
      const { data } = await apiClient.get<MangaResponse>('/manga', {
        params: { page, limit },
      });
      return data;
    },
  });
};

export const useCreateManga = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<Manga>) => {
      const response = await apiClient.post('/manga', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mangas'] });
    },
    onError: () => {
      console.log('Failed to create manga');
    },
  });
};

export const useUpdateManga = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Manga> }) => {
      const response = await apiClient.patch(`/manga/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mangas'] });
      console.log('Manga updated successfully');
    },
    onError: () => {
      console.log('Failed to update manga');
    },
  });
};

export const useDeleteManga = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/manga/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mangas'] });
      console.log('Manga deleted successfully');
    },
    onError: () => {
      console.log('Failed to delete manga');
    },
  });
}; 