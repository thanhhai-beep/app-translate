import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  content: string;
  contentType: 'text' | 'image';
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
}

interface ChapterResponse {
  data: Chapter[];
  total: number;
}

interface CreateChapterData {
  chapterNumber: number;
  title: string;
  content: string | File;
  contentType: 'text' | 'image';
  status: 'draft' | 'published' | 'archived';
}

export const useChapters = (mangaId: string, page: number, pageSize: number) => {
  return useQuery<ChapterResponse>({
    queryKey: ['chapters', mangaId, page, pageSize],
    queryFn: async (): Promise<ChapterResponse> => {
      const { data } = await apiClient.get<ChapterResponse>(`/manga/${mangaId}/chapters?page=${page}&pageSize=${pageSize}`);
      return data;
    },
  });
};

export const useChapter = (mangaId: string, chapterId: string) => {
  return useQuery<Chapter>({
    queryKey: ['chapter', mangaId, chapterId],
    queryFn: async (): Promise<Chapter> => {
      const { data } = await apiClient.get<Chapter>(`/manga/${mangaId}/chapters/${chapterId}`);
      return data;
    },
  });
};

export const useCreateChapter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ mangaId, data }: { mangaId: string; data: FormData }) => {
      const response = await apiClient.post(`/manga/${mangaId}/chapters`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      console.log('Chapter created successfully');
      queryClient.invalidateQueries({ queryKey: ['chapters'] });
    },
    onError: () => {
      console.log('Failed to create chapter');
    },
  });
};

export const useUpdateChapter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ mangaId, chapterId, data }: { mangaId: string; chapterId: string; data: FormData }) => {
      const response = await apiClient.put(`/manga/${mangaId}/chapters/${chapterId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      console.log('Chapter updated successfully');
      queryClient.invalidateQueries({ queryKey: ['chapters'] });
    },
    onError: () => {
      console.log('Failed to update chapter');
    },
  });
};

export const useDeleteChapter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ mangaId, chapterId }: { mangaId: string; chapterId: string }) => {
      await apiClient.delete(`/manga/${mangaId}/chapters/${chapterId}`);
    },
    onSuccess: () => {
      console.log('Chapter deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['chapters'] });
    },
    onError: () => {
      console.log('Failed to delete chapter');
    },
  });
}; 