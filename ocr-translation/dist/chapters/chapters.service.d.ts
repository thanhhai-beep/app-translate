import { Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Manga } from '../manga/entities/manga.entity';
export declare class ChaptersService {
    private readonly chapterRepository;
    private readonly mangaRepository;
    constructor(chapterRepository: Repository<Chapter>, mangaRepository: Repository<Manga>);
    create(createChapterDto: CreateChapterDto): Promise<Chapter>;
    findAll(mangaId: string, page?: number, pageSize?: number): Promise<{
        data: Chapter[];
        total: number;
    }>;
    findOne(mangaId: string, id: string): Promise<Chapter>;
    update(mangaId: string, id: string, updateChapterDto: UpdateChapterDto): Promise<Chapter>;
    remove(mangaId: string, id: string): Promise<Chapter>;
}
