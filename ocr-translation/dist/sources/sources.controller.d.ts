import { SourcesService } from './sources.service';
import { ImportMangaListDto } from './dto/import-manga-list.dto';
import { MangaInfo } from './entities/manga-info.entity';
import { Manga } from '../manga/entities/manga.entity';
export declare class SourcesController {
    private readonly sourcesService;
    constructor(sourcesService: SourcesService);
    importMangaList(importMangaListDto: ImportMangaListDto): Promise<MangaInfo[]>;
    saveMangaList(mangaList: MangaInfo[]): Promise<Manga[]>;
    saveMangaWithImages(mangaInfo: MangaInfo): Promise<Manga>;
}
