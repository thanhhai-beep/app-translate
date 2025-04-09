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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chapter = exports.ChapterStatus = void 0;
const typeorm_1 = require("typeorm");
const manga_entity_1 = require("./manga.entity");
const translation_entity_1 = require("../../translation/entities/translation.entity");
var ChapterStatus;
(function (ChapterStatus) {
    ChapterStatus["DRAFT"] = "DRAFT";
    ChapterStatus["TRANSLATING"] = "TRANSLATING";
    ChapterStatus["REVIEWING"] = "REVIEWING";
    ChapterStatus["PUBLISHED"] = "PUBLISHED";
})(ChapterStatus || (exports.ChapterStatus = ChapterStatus = {}));
let Chapter = class Chapter {
    id;
    mangaId;
    manga;
    title;
    number;
    description;
    pageUrls;
    pageCount;
    sourceLanguage;
    targetLanguages;
    translations;
    viewCount;
    createdAt;
    updatedAt;
};
exports.Chapter = Chapter;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Chapter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'manga_id' }),
    __metadata("design:type", String)
], Chapter.prototype, "mangaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => manga_entity_1.Manga, (manga) => manga.chapters),
    (0, typeorm_1.JoinColumn)({ name: 'manga_id' }),
    __metadata("design:type", manga_entity_1.Manga)
], Chapter.prototype, "manga", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chapter.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Chapter.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'page_urls', nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "pageUrls", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'page_count', default: 0 }),
    __metadata("design:type", Number)
], Chapter.prototype, "pageCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'source_language', nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "sourceLanguage", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'target_languages', nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "targetLanguages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => translation_entity_1.Translation, (translation) => translation.chapter),
    __metadata("design:type", Array)
], Chapter.prototype, "translations", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Chapter.prototype, "viewCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Chapter.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Chapter.prototype, "updatedAt", void 0);
exports.Chapter = Chapter = __decorate([
    (0, typeorm_1.Entity)('chapters')
], Chapter);
//# sourceMappingURL=chapter.entity.js.map