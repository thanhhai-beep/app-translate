export declare class CreateMangaDto {
    title: string;
    originalTitle: string;
    description?: string;
    author?: string;
    artist?: string;
    publisher?: string;
    status?: string;
    genres?: string[];
    coverImage?: string;
    sourceLanguage?: string;
    targetLanguages?: string[];
    tags?: string[];
    viewCount?: number;
    favoriteCount?: number;
}
export declare class UpdateMangaDto extends CreateMangaDto {
}
