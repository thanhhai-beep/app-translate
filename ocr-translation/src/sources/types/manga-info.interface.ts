export interface MangaInfo {
  title: string;
  url: string;
  sourceType: string;
  description?: string;
  coverImage?: string;
  type?: string;
  author?: string;
  status?: string;
  genres?: string;
  sourceUrl?: string;
  totalChapters?: number;
  chapters?: Array<{
    title: string;
    url: string;
    date: string;
  }>;
} 