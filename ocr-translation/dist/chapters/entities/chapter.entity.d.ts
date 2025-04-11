import { Manga } from '../../manga/entities/manga.entity';
export declare enum ChapterType {
    TEXT = "text",
    IMAGE = "image"
}
export declare enum ChapterStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    HIDDEN = "hidden"
}
export declare enum ContentType {
    TEXT = "text",
    IMAGE = "image"
}
export declare class Chapter {
    id: string;
    chapterNumber: number;
    title: string;
    content: string;
    type: ChapterType;
    status: ChapterStatus;
    images: string[];
    contentType: ContentType;
    manga: Manga;
    mangaId: string;
    createdAt: Date;
    updatedAt: Date;
}
