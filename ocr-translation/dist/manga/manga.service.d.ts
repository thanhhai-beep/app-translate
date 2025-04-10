import { Repository } from 'typeorm';
import { Manga } from './entities/manga.entity';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
export declare class MangaService {
    private mangaRepository;
    constructor(mangaRepository: Repository<Manga>);
    create(createMangaDto: CreateMangaDto): Promise<Manga>;
    findAll(page?: number, limit?: number): Promise<{
        data: Manga[];
        total: number;
    }>;
    findOne(id: string): Promise<Manga>;
    update(id: string, updateMangaDto: UpdateMangaDto): Promise<Manga>;
    remove(id: string): Promise<void>;
}
