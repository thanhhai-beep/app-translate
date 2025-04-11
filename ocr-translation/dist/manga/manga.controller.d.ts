import { MangaService } from './manga.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
export declare class MangaController {
    private readonly mangaService;
    constructor(mangaService: MangaService);
    create(createMangaDto: CreateMangaDto): Promise<import("./entities").Manga>;
    findAll(page?: number, limit?: number): Promise<{
        mangas: import("./entities").Manga[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities").Manga>;
    update(id: string, updateMangaDto: UpdateMangaDto): Promise<import("./entities").Manga>;
    remove(id: string): Promise<void>;
}
