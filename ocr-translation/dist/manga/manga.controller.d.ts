import { MangaService } from './manga.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
export declare class MangaController {
    private readonly mangaService;
    constructor(mangaService: MangaService);
    create(createMangaDto: CreateMangaDto): Promise<import("./entities").Manga>;
    findAll(): Promise<import("./entities").Manga[]>;
    findOne(id: string): Promise<import("./entities").Manga>;
    update(id: string, updateMangaDto: UpdateMangaDto): Promise<import("./entities").Manga>;
    remove(id: string): Promise<void>;
}
