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
exports.MangaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const manga_entity_1 = require("./entities/manga.entity");
let MangaService = class MangaService {
    mangaRepository;
    constructor(mangaRepository) {
        this.mangaRepository = mangaRepository;
    }
    async create(createMangaDto) {
        const mangaData = {
            ...createMangaDto,
            genres: createMangaDto.genres?.join(','),
            targetLanguages: createMangaDto.targetLanguages?.join(','),
            tags: createMangaDto.tags?.join(',')
        };
        const manga = this.mangaRepository.create(mangaData);
        return this.mangaRepository.save(manga);
    }
    async findAll(page = 1, limit = 10) {
        const [data, total] = await this.mangaRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC',
            },
        });
        return { data, total };
    }
    async findOne(id) {
        const manga = await this.mangaRepository.findOne({ where: { id } });
        if (!manga) {
            throw new common_1.NotFoundException(`Manga with ID ${id} not found`);
        }
        return manga;
    }
    async update(id, updateMangaDto) {
        const manga = await this.findOne(id);
        Object.assign(manga, updateMangaDto);
        return this.mangaRepository.save(manga);
    }
    async remove(id) {
        const result = await this.mangaRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Manga with ID ${id} not found`);
        }
    }
};
exports.MangaService = MangaService;
exports.MangaService = MangaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(manga_entity_1.Manga)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MangaService);
//# sourceMappingURL=manga.service.js.map