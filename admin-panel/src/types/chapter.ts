export interface Chapter {
  id: string;
  mangaId: string;
  chapterNumber: number;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  images?: { url: string }[];
} 