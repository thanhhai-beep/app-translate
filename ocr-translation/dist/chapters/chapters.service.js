"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChaptersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chapter_entity_1 = require("./entities/chapter.entity");
const manga_entity_1 = require("../manga/entities/manga.entity");
let ChaptersService = class ChaptersService {
    chapterRepository;
    mangaRepository;
    constructor(chapterRepository, mangaRepository) {
        this.chapterRepository = chapterRepository;
        this.mangaRepository = mangaRepository;
    }
    async create(createChapterDto) {
        const manga = await this.mangaRepository.findOne({ where: { id: createChapterDto.mangaId } });
        if (!manga) {
            throw new common_1.NotFoundException('Manga not found');
        }
        const chapter = new chapter_entity_1.Chapter();
        Object.assign(chapter, createChapterDto);
        chapter.manga = manga;
        return this.chapterRepository.save(chapter);
    }
    async findAll(mangaId, page = 1, pageSize = 10) {
        const manga = await this.mangaRepository.findOne({ where: { id: mangaId } });
        if (!manga) {
            throw new common_1.BadRequestException(`Manga with ID ${mangaId} not found`);
        }
        const [data, total] = await this.chapterRepository.findAndCount({
            where: { mangaId },
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: { chapterNumber: 'ASC' },
        });
        return { data, total };
    }
    async findOne(mangaId, id) {
        const manga = await this.mangaRepository.findOne({ where: { id: mangaId } });
        if (!manga) {
            throw new common_1.BadRequestException(`Manga with ID ${mangaId} not found`);
        }
        const chapter = await this.chapterRepository.findOne({
            where: { id, mangaId },
        });
        if (!chapter) {
            throw new common_1.NotFoundException(`Chapter with ID ${id} not found`);
        }
        if (chapter.contentType === 'image') {
            chapter.content = (process.env.DOMAIN || 'http://localhost:3000') + chapter.content;
        }
        return chapter;
    }
    async update(mangaId, id, updateChapterDto) {
        const manga = await this.mangaRepository.findOne({ where: { id: mangaId } });
        if (!manga) {
            throw new common_1.BadRequestException(`Manga with ID ${mangaId} not found`);
        }
        const chapter = await this.findOne(mangaId, id);
        Object.assign(chapter, updateChapterDto);
        return await this.chapterRepository.save(chapter);
    }
    async remove(mangaId, id) {
        const manga = await this.mangaRepository.findOne({ where: { id: mangaId } });
        if (!manga) {
            throw new common_1.BadRequestException(`Manga with ID ${mangaId} not found`);
        }
        const chapter = await this.findOne(mangaId, id);
        return await this.chapterRepository.remove(chapter);
    }
};
exports.ChaptersService = ChaptersService;
exports.ChaptersService = ChaptersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chapter_entity_1.Chapter)),
    __param(1, (0, typeorm_1.InjectRepository)(manga_entity_1.Manga)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChaptersService);
//# sourceMappingURL=chapters.service.js.map