export interface MangaInfo {
  title: string;
  url: string;
  sourceType: string;
  description?: string;
  coverImage?: string;
  author?: string;
  status?: string;
  genres?: string;
  chapters?: Array<{
    title: string;
    url: string;
    date: string;
  }>;
} 