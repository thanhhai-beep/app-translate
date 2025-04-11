import { MangaType, MangaStatus } from '../entities/manga.entity';
export declare class UpdateMangaDto {
    title?: string;
    originalTitle?: string;
    description?: string;
    author?: string;
    artist?: string;
    publisher?: string;
    status?: MangaStatus;
    genres?: string[];
    coverImage?: string;
    sourceLanguage?: string;
    targetLanguages?: string[];
    type?: MangaType;
    categoryIds?: string[];
}
