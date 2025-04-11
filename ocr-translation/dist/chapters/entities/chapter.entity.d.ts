import { Manga } from '../../manga/entities/manga.entity';
export declare enum ChapterType {
    TEXT = "TEXT",
    IMAGE = "IMAGE"
}
export declare enum ChapterStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    HIDDEN = "HIDDEN"
}
export declare class Chapter {
    id: string;
    chapterNumber: number;
    title: string;
    content: string;
    type: ChapterType;
    status: ChapterStatus;
    images: string[];
    contentType: ChapterType;
    manga: Manga;
    mangaId: string;
    createdAt: Date;
    updatedAt: Date;
}
