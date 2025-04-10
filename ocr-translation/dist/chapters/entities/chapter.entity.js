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
const manga_entity_1 = require("../../manga/entities/manga.entity");
var ChapterStatus;
(function (ChapterStatus) {
    ChapterStatus["DRAFT"] = "draft";
    ChapterStatus["PUBLISHED"] = "published";
    ChapterStatus["ARCHIVED"] = "archived";
})(ChapterStatus || (exports.ChapterStatus = ChapterStatus = {}));
let Chapter = class Chapter {
    id;
    mangaId;
    chapterNumber;
    title;
    content;
    contentType;
    status;
    createdAt;
    updatedAt;
    manga;
};
exports.Chapter = Chapter;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Chapter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chapter.prototype, "mangaId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Chapter.prototype, "chapterNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chapter.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Chapter.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['text', 'image'], default: 'text' }),
    __metadata("design:type", String)
], Chapter.prototype, "contentType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ChapterStatus,
        default: ChapterStatus.DRAFT
    }),
    __metadata("design:type", String)
], Chapter.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Chapter.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Chapter.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => manga_entity_1.Manga, manga => manga.chapters),
    (0, typeorm_1.JoinColumn)({ name: 'mangaId' }),
    __metadata("design:type", manga_entity_1.Manga)
], Chapter.prototype, "manga", void 0);
exports.Chapter = Chapter = __decorate([
    (0, typeorm_1.Entity)()
], Chapter);
//# sourceMappingURL=chapter.entity.js.map