import { Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
export declare class ChapterService {
    private chapterRepository;
    constructor(chapterRepository: Repository<Chapter>);
    create(createChapterDto: CreateChapterDto[]): Promise<Chapter[]>;
    findAll(mangaId: string, page?: number, limit?: number): Promise<{
        data: Chapter[];
        total: number;
    }>;
    findOne(id: string): Promise<Chapter>;
    update(id: string, updateChapterDto: UpdateChapterDto): Promise<Chapter>;
    remove(id: string): Promise<void>;
}
