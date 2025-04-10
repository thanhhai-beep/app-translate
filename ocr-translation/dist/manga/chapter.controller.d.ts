import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
export declare class ChapterController {
    private readonly chapterService;
    constructor(chapterService: ChapterService);
    create(createChapterDto: CreateChapterDto): Promise<import("./entities").Chapter[]>;
    findAll(mangaId: string, page?: number, limit?: number): Promise<{
        data: import("./entities").Chapter[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities").Chapter>;
    update(id: string, updateChapterDto: UpdateChapterDto): Promise<import("./entities").Chapter>;
    remove(id: string): Promise<void>;
}
