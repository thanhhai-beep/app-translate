import { Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterDto, UpdateChapterDto } from './dto/create-chapter.dto';
export declare class ChapterService {
    private chapterRepository;
    constructor(chapterRepository: Repository<Chapter>);
    create(mangaId: string, createChapterDto: CreateChapterDto): Promise<Chapter>;
    findByMangaAndNumber(mangaId: string, chapterNumber: number): Promise<Chapter>;
    findAllByManga(mangaId: string): Promise<Chapter[]>;
    findOne(id: string, chapterNumber?: number): Promise<Chapter>;
    update(id: string, updateChapterDto: Partial<UpdateChapterDto>): Promise<Chapter>;
    remove(id: string): Promise<void>;
}
