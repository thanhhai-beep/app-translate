import { Manga } from '../manga/manga.entity';
export declare enum ChapterContentType {
    TEXT = "text",
    IMAGE = "image"
}
export declare class Chapter {
    id: string;
    chapterNumber: number;
    title: string;
    contentType: ChapterContentType;
    content: string;
    images: string[];
    status: string;
    manga: Manga;
    createdAt: Date;
    updatedAt: Date;
}
