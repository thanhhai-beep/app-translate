import { Chapter } from '../chapters/chapter.entity';
import { Category } from '../categories/category.entity';
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
    status: string;
    coverImage: string;
    sourceUrl: string;
    type: MangaType;
    categories: Category[];
    chapters: Chapter[];
    createdAt: Date;
    updatedAt: Date;
}
