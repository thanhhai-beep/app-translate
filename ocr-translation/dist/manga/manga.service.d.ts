import { Repository } from 'typeorm';
import { Manga } from './entities/manga.entity';
import { CreateMangaDto, UpdateMangaDto } from './dto/create-manga.dto';
export declare class MangaService {
    private mangaRepository;
    constructor(mangaRepository: Repository<Manga>);
    create(createMangaDto: CreateMangaDto): Promise<Manga>;
    findAll(): Promise<Manga[]>;
    findOne(id: string): Promise<Manga>;
    update(id: string, updateMangaDto: Partial<UpdateMangaDto>): Promise<Manga>;
    remove(id: string): Promise<void>;
}
