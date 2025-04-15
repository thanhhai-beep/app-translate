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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const manga_entity_1 = require("../manga/entities/manga.entity");
const chapter_entity_1 = require("../chapters/entities/chapter.entity");
const category_entity_1 = require("../categories/entities/category.entity");
let AppService = class AppService {
    mangaRepository;
    chapterRepository;
    categoryRepository;
    constructor(mangaRepository, chapterRepository, categoryRepository) {
        this.mangaRepository = mangaRepository;
        this.chapterRepository = chapterRepository;
        this.categoryRepository = categoryRepository;
    }
    async getMangaList(page = 1, pageSize = 10, category) {
        const skip = (page - 1) * pageSize;
        const query = this.mangaRepository
            .createQueryBuilder('manga')
            .leftJoinAndSelect('manga.categories', 'category')
            .where('manga.status = :status', { status: 'PUBLISHED' });
        if (category) {
            query.andWhere('category.id = :categoryId', { categoryId: category });
        }
        const [data, total] = await query
            .skip(skip)
            .take(pageSize)
            .getManyAndCount();
        return { data, total };
    }
    async getMangaDetail(id) {
        const query = this.mangaRepository
            .createQueryBuilder('manga')
            .leftJoinAndSelect('manga.categories', 'category')
            .where('manga.id = :id', { id })
            .andWhere('manga.status = :status', { status: 'PUBLISHED' });
        const sql = query.getQueryAndParameters();
        console.log('Manga Detail Query:', sql);
        const manga = await query.getOne();
        if (!manga) {
            throw new common_1.NotFoundException('Manga not found');
        }
        return manga;
    }
    async getChapterList(mangaId, page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const query = this.chapterRepository
            .createQueryBuilder('chapter')
            .where('chapter.mangaId = :mangaId', { mangaId })
            .andWhere('chapter.status = :status', { status: chapter_entity_1.ChapterStatus.PUBLISHED })
            .orderBy('chapter.chapterNumber', 'ASC');
        const sql = query.getQueryAndParameters();
        console.log('Chapter List Query:', sql);
        const [data, total] = await query
            .skip(skip)
            .take(pageSize)
            .getManyAndCount();
        return { data, total };
    }
    async getChapterDetail(mangaId, chapterId) {
        const query = this.chapterRepository
            .createQueryBuilder('chapter')
            .where('chapter.id = :chapterId', { chapterId })
            .andWhere('chapter.mangaId = :mangaId', { mangaId })
            .andWhere('chapter.status = :status', { status: chapter_entity_1.ChapterStatus.PUBLISHED });
        const sql = query.getQueryAndParameters();
        console.log('Chapter Detail Query:', sql);
        const chapter = await query.getOne();
        if (!chapter) {
            throw new common_1.NotFoundException('Chapter not found');
        }
        return chapter;
    }
    async getCategories() {
        const query = this.categoryRepository.createQueryBuilder('category');
        const sql = query.getQueryAndParameters();
        console.log('Categories Query:', sql);
        return query.getMany();
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(manga_entity_1.Manga)),
    __param(1, (0, typeorm_1.InjectRepository)(chapter_entity_1.Chapter)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map