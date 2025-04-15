export interface Manga {
  id?: string;
  title: string;
  url: string;
  sourceType: string;
  description?: string;
  coverImage?: string;
  author?: string;
  status?: string;
  genres?: string;
  type: string;
  sourceUrl?: string;
  chapters?: Array<{
    title: string;
    url: string;
    date: string;
  }>;
} 