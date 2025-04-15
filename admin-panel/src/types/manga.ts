export enum MangaType {
  COMIC = 'comic',
  TEXT = 'text',
  IMPORT = 'import'
}

export enum MangaStatus {
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  HIATUS = 'HIATUS',
  CANCELLED = 'CANCELLED'
}

export interface Manga {
  id?: string;
  title: string;
  originalTitle: string;
  description?: string;
  author: string;
  categories?: string[];
  type: MangaType;
  coverImage?: string;
  status?: string;
  url: string;
  sourceType: string;
  sourceUrl?: string;
  chapters?: Chapter[];
  createdAt?: Date;
  updatedAt?: Date;
  categoryIds?: string[];
}

export interface Chapter {
  id?: string;
  title: string;
  number: number;
  url: string;
  mangaId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MangaResponse {
  mangas: Manga[];
  total: number;
}

export interface MangaInfo {
  title: string;
  url: string;
  sourceType: string;
  type: 'import';
  sourceUrl: string;
} 