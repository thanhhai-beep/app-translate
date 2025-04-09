import { Manga } from './manga.entity';
import { Translation } from '../../translation/entities/translation.entity';
export declare enum ChapterStatus {
    DRAFT = "DRAFT",
    TRANSLATING = "TRANSLATING",
    REVIEWING = "REVIEWING",
    PUBLISHED = "PUBLISHED"
}
export declare class Chapter {
    id: string;
    mangaId: string;
    manga: Manga;
    title: string;
    number: number;
    description: string;
    pageUrls: string;
    pageCount: number;
    sourceLanguage: string;
    targetLanguages: string;
    translations: Translation[];
    viewCount: number;
    createdAt: Date;
    updatedAt: Date;
}
