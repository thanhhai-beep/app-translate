import { Manga } from '../../manga/entities/manga.entity';
export declare enum ChapterStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived"
}
export declare class Chapter {
    id: string;
    mangaId: string;
    chapterNumber: number;
    title: string;
    content: string;
    contentType: 'text' | 'image';
    status: ChapterStatus;
    createdAt: Date;
    updatedAt: Date;
    manga: Manga;
}
