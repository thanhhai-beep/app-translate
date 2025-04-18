export interface AudioFile {
  id: string;
  title: string;
  mangaId: string;
  startChapterNumber: number;
  endChapterNumber: number;
  filePath?: string;
  duration?: number;
  fileSize?: number;
  format: string;
  bitrate: number;
  sampleRate: number;
  channels: number;
  status: 'processing' | 'completed' | 'failed';
  errorMessage?: string;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
} 