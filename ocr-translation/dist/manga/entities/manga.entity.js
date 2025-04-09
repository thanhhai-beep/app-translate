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
exports.Manga = exports.MangaType = exports.MangaStatus = void 0;
const typeorm_1 = require("typeorm");
const chapter_entity_1 = require("./chapter.entity");
var MangaStatus;
(function (MangaStatus) {
    MangaStatus["ONGOING"] = "ONGOING";
    MangaStatus["COMPLETED"] = "COMPLETED";
    MangaStatus["HIATUS"] = "HIATUS";
    MangaStatus["DROPPED"] = "DROPPED";
})(MangaStatus || (exports.MangaStatus = MangaStatus = {}));
var MangaType;
(function (MangaType) {
    MangaType["MANGA"] = "MANGA";
    MangaType["MANHWA"] = "MANHWA";
    MangaType["MANHUA"] = "MANHUA";
    MangaType["NOVEL"] = "NOVEL";
})(MangaType || (exports.MangaType = MangaType = {}));
let Manga = class Manga {
    id;
    title;
    originalTitle;
    description;
    author;
    artist;
    publisher;
    status;
    genres;
    coverImage;
    sourceLanguage;
    targetLanguages;
    chapters;
    metadata;
    translation;
    tags;
    viewCount;
    favoriteCount;
    createdAt;
    updatedAt;
};
exports.Manga = Manga;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Manga.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Manga.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'original_title' }),
    __metadata("design:type", String)
], Manga.prototype, "originalTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Manga.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Manga.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Manga.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Manga.prototype, "publisher", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Manga.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Manga.prototype, "genres", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cover_image', nullable: true }),
    __metadata("design:type", String)
], Manga.prototype, "coverImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'source_language', nullable: true }),
    __metadata("design:type", String)
], Manga.prototype, "sourceLanguage", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'target_languages', nullable: true }),
    __metadata("design:type", String)
], Manga.prototype, "targetLanguages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chapter_entity_1.Chapter, (chapter) => chapter.manga),
    __metadata("design:type", Array)
], Manga.prototype, "chapters", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Manga.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Manga.prototype, "translation", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Manga.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Manga.prototype, "viewCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Manga.prototype, "favoriteCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Manga.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Manga.prototype, "updatedAt", void 0);
exports.Manga = Manga = __decorate([
    (0, typeorm_1.Entity)('manga')
], Manga);
//# sourceMappingURL=manga.entity.js.map