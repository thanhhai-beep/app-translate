import { Chapter } from '../chapters/chapter.entity';
import { Category } from '../categories/category.entity';
export declare class Manga {
    id: string;
    title: string;
    originalTitle: string;
    description: string;
    author: string;
    status: string;
    coverImage: string;
    categories: Category[];
    chapters: Chapter[];
    createdAt: Date;
    updatedAt: Date;
}
