import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Manga, MangaResponse } from '@/types/manga';
import { useState } from 'react';
import { MangaInfo } from '@/types/manga';

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

interface ImportMangaParams {
  url: string;
  sourceType: string;
}

export const useImportManga = () => {
  return useMutation<MangaInfo[], Error, ImportMangaParams>({
    mutationFn: async (params: ImportMangaParams) => {
      const response = await apiClient.post<MangaInfo[]>('/sources/import-list', params);
      return response.data;
    },
    onSuccess: () => {
      console.log('Manga imported successfully');
    },
    onError: (error: Error) => {
      console.error(error.message || 'Failed to import manga');
    }
  });
};

export const useSources = () => {
  const [loading, setLoading] = useState(false);

  const importMangaList = async (url: string, sourceType: string): Promise<MangaInfo[]> => {
    setLoading(true);
    try {
      const { data } = await apiClient.post<MangaInfo[]>('/sources/import-list', {
        url,
        sourceType,
      });
      return data;
    } finally {
      setLoading(false);
    }
  };

  const saveMangaList = async (mangaList: MangaInfo[]): Promise<void> => {
    setLoading(true);
    try {
      await apiClient.post('/sources/save-manga-list', { mangaList });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    importMangaList,
    saveMangaList,
  };
}; 