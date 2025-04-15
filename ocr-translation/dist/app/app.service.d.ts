import { Repository } from 'typeorm';
import { Manga } from '../manga/entities/manga.entity';
import { Chapter } from '../chapters/entities/chapter.entity';
import { Category } from '../categories/entities/category.entity';
export declare class AppService {
    private readonly mangaRepository;
    private readonly chapterRepository;
    private readonly categoryRepository;
    constructor(mangaRepository: Repository<Manga>, chapterRepository: Repository<Chapter>, categoryRepository: Repository<Category>);
    getMangaList(page?: number, pageSize?: number, category?: string): Promise<{
        data: Manga[];
        total: number;
    }>;
    getMangaDetail(id: string): Promise<Manga>;
    getChapterList(mangaId: string, page?: number, pageSize?: number): Promise<{
        data: Chapter[];
        total: number;
    }>;
    getChapterDetail(mangaId: string, chapterId: string): Promise<Chapter>;
    getCategories(): Promise<Category[]>;
}
