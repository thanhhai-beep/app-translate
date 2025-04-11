import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Chapter, CreateChapterDto, UpdateChapterDto } from '@/types/chapter';

export function useChapters(mangaId: string, page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: ['chapters', mangaId, page, pageSize],
    queryFn: async () => {
      const response = await apiClient.get<{ data: Chapter[]; total: number }>(
        `/manga/${mangaId}/chapters?page=${page}&pageSize=${pageSize}`
      );
      return response.data;
    },
  });
}

export function useCreateChapter() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateChapterDto) => {
      const response = await apiClient.post<Chapter>(`/manga/${data.mangaId}/chapters`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chapters', variables.mangaId] });
    },
  });
}

export function useUpdateChapter() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ mangaId, chapterId, data }: { mangaId: string; chapterId: string; data: UpdateChapterDto }) => {
      const response = await apiClient.put<Chapter>(`/manga/${mangaId}/chapters/${chapterId}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chapters', variables.mangaId] });
    },
  });
}

export function useDeleteChapter() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ mangaId, chapterId }: { mangaId: string; chapterId: string }) => {
      await apiClient.delete(`/manga/${mangaId}/chapters/${chapterId}`);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chapters', variables.mangaId] });
    },
  });
} 