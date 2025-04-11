import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ChaptersService } from './chapters.service';
export declare class ChaptersController {
    private readonly chaptersService;
    constructor(chaptersService: ChaptersService);
    create(mangaId: string, createChapterDto: CreateChapterDto): Promise<import("./entities/chapter.entity").Chapter>;
    findAll(mangaId: string, page?: number, pageSize?: number): Promise<{
        data: import("./entities/chapter.entity").Chapter[];
        total: number;
    }>;
    findOne(mangaId: string, id: string): Promise<import("./entities/chapter.entity").Chapter>;
    update(mangaId: string, id: string, updateChapterDto: UpdateChapterDto): Promise<import("./entities/chapter.entity").Chapter>;
    remove(mangaId: string, id: string): Promise<import("./entities/chapter.entity").Chapter>;
}
