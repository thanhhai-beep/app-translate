import { MangaType } from '../entities/manga.entity';
export declare class CreateMangaDto {
    title: string;
    originalTitle?: string;
    description?: string;
    author?: string;
    artist?: string;
    publisher?: string;
    status?: string;
    coverImage?: string;
    genres?: string;
    tags?: string;
    type?: MangaType;
    categoryIds?: string[];
}
export declare class UpdateMangaDto extends CreateMangaDto {
}
