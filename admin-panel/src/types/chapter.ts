export enum ContentType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

export enum ChapterStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export interface Chapter {
  id: string;
  mangaId: string;
  chapterNumber: number;
  title: string;
  content: string;
  contentType: ContentType;
  status: ChapterStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChapterResponse {
  data: Chapter[];
  total: number;
}

export interface CreateChapterDto {
  mangaId: string;
  chapterNumber: number;
  title: string;
  content: string;
  contentType: ContentType;
  status?: ChapterStatus;
}

export interface UpdateChapterDto {
  chapterNumber?: number;
  title?: string;
  content?: string;
  contentType?: ContentType;
  status?: ChapterStatus;
} 