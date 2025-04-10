import { Chapter } from '../../chapters/entities/chapter.entity';
export declare enum MangaStatus {
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED",
    HIATUS = "HIATUS",
    DROPPED = "DROPPED"
}
export declare enum MangaType {
    MANGA = "MANGA",
    MANHWA = "MANHWA",
    MANHUA = "MANHUA",
    NOVEL = "NOVEL"
}
export declare class Manga {
    id: string;
    title: string;
    originalTitle: string;
    description: string;
    author: string;
    artist: string;
    publisher: string;
    status: string;
    genres: string;
    coverImage: string;
    sourceLanguage: string;
    targetLanguages: string;
    chapters: Chapter[];
    metadata: any;
    translation: {
        sourceLanguage: string;
        targetLanguages: string[];
        team?: string;
        status: string;
    };
    tags: string;
    viewCount: number;
    favoriteCount: number;
    createdAt: Date;
    updatedAt: Date;
}
