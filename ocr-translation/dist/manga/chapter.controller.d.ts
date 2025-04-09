import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
export declare class ChapterController {
    private readonly chapterService;
    constructor(chapterService: ChapterService);
    create(mangaId: string, createChapterDto: CreateChapterDto): Promise<import("./entities").Chapter>;
    findAll(mangaId: string): Promise<import("./entities").Chapter[]>;
    findOne(mangaId: string, chapterNumber: number): Promise<import("./entities").Chapter>;
    update(mangaId: string, updateChapterDto: UpdateChapterDto): Promise<import("./entities").Chapter>;
    remove(mangaId: string): Promise<void>;
}
