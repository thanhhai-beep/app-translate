import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { message } from 'antd';
import { Manga, MangaResponse } from '@/types/manga';

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

export const useMangas = (page: number, pageSize: number) => {
  return useQuery<MangaResponse>({
    queryKey: ['mangas', page, pageSize],
    queryFn: async (): Promise<MangaResponse> => {
      const { data } = await apiClient.get<MangaResponse>(`/manga?page=${page}&pageSize=${pageSize}`);
      return data;
    },
  });
};

export const useCreateManga = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (manga: Partial<Manga>) => {
      const { data } = await apiClient.post<Manga>('/manga', manga);
      return data;
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
    mutationFn: async ({ id, manga }: { id: string; manga: Partial<Manga> }) => {
      const { data } = await apiClient.patch<Manga>(`/manga/${id}`, manga);
      return data;
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
      const { data } = await apiClient.delete<Manga>(`/manga/${id}`);
      return data;
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