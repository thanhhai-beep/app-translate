import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getMangaList(page?: number, pageSize?: number, category?: string): Promise<{
        data: import("../manga/entities").Manga[];
        total: number;
    }>;
    getMangaDetail(id: string): Promise<import("../manga/entities").Manga>;
    getChapterList(id: string, page?: number, pageSize?: number): Promise<{
        data: import("../chapters/entities/chapter.entity").Chapter[];
        total: number;
    }>;
    getChapterDetail(id: string, chapterId: string): Promise<import("../chapters/entities/chapter.entity").Chapter>;
    getCategories(): Promise<import("../categories/entities/category.entity").Category[]>;
}
