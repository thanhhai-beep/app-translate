import { Manga } from '../manga/manga.entity';
export declare class Category {
    id: string;
    name: string;
    description: string;
    mangas: Manga[];
    createdAt: Date;
    updatedAt: Date;
}
