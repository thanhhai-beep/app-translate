import { Repository } from 'typeorm';
import { Manga } from './entities/manga.entity';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { Category } from '../categories/category.entity';
export declare class MangaService {
    private mangaRepository;
    private categoryRepository;
    constructor(mangaRepository: Repository<Manga>, categoryRepository: Repository<Category>);
    create(createMangaDto: CreateMangaDto): Promise<Manga>;
    findAll(page?: number, limit?: number): Promise<{
        mangas: Manga[];
        total: number;
    }>;
    findOne(id: string): Promise<Manga>;
    update(id: string, updateMangaDto: UpdateMangaDto): Promise<Manga>;
    remove(id: string): Promise<void>;
}
