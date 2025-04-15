import { Chapter } from '../../chapters/entities/chapter.entity';
import { Category } from '../../categories/category.entity';
export declare enum MangaStatus {
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED",
    HIATUS = "HIATUS",
    DROPPED = "DROPPED"
}
export declare enum MangaType {
    COMIC = "comic",
    TEXT = "text",
    IMPORT = "import"
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
    categories: Category[];
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
    sourceUrl: string;
    createdAt: Date;
    updatedAt: Date;
    type: MangaType;
}
