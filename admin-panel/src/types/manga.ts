export enum MangaType {
  COMIC = 'comic',
  TEXT = 'text'
}

export enum MangaStatus {
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  HIATUS = 'HIATUS',
  CANCELLED = 'CANCELLED'
}

export interface Manga {
  id: string;
  title: string;
  originalTitle: string;
  description: string;
  author: string;
  categories?: string[];
  type: MangaType;
  coverImage: string;
  status: MangaStatus;
  createdAt: string;
  updatedAt: string;
  categoryIds?: string[];
}

export interface MangaResponse {
  mangas: Manga[];
  total: number;
} 