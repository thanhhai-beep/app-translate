import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { AudioFile } from '@/types/audio';

interface CreateAudioDto {
  title: string;
  mangaId: string;
  startChapterNumber: number;
  endChapterNumber: number;
  format?: string;
  bitrate?: number;
  sampleRate?: number;
  channels?: number;
}

export const useAudio = () => {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: audioFiles, isLoading: isLoadingList } = useQuery({
    queryKey: ['audio-files'],
    queryFn: async () => {
      const response = await apiClient.get<AudioFile[]>('/audio');
      return response.data;
    },
  });

  const { data: audioFile, isLoading: isLoadingDetail } = useQuery({
    queryKey: ['audio-file'],
    queryFn: async () => {
      const response = await apiClient.get<AudioFile>('/audio');
      return response.data;
    },
    enabled: false,
  });

  const createAudioMutation = useMutation({
    mutationFn: async (data: CreateAudioDto) => {
      const response = await apiClient.post<AudioFile>('/audio', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audio-files'] });
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to create audio');
    },
  });

  const deleteAudioMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/audio/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audio-files'] });
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to delete audio');
    },
  });

  const regenerateAudioMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post<AudioFile>(`/audio/${id}/regenerate`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audio-files'] });
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to regenerate audio');
    },
  });

  const getAudioFile = async (id: string): Promise<Blob> => {
    const response = await apiClient.get(`/audio/${id}/file`, {
      responseType: 'blob',
    });
    return response.data as Blob;
  };

  return {
    audioFiles,
    audioFile,
    isLoadingList,
    isLoadingDetail,
    error,
    createAudio: createAudioMutation.mutateAsync,
    deleteAudio: deleteAudioMutation.mutateAsync,
    regenerateAudio: regenerateAudioMutation.mutateAsync,
    getAudioFile,
  };
}; 