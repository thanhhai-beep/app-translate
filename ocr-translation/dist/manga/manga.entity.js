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
exports.Manga = exports.MangaType = void 0;
const typeorm_1 = require("typeorm");
const chapter_entity_1 = require("../chapters/chapter.entity");
const category_entity_1 = require("../categories/category.entity");
var MangaType;
(function (MangaType) {
    MangaType["COMIC"] = "comic";
    MangaType["TEXT"] = "text";
    MangaType["IMPORT"] = "import";
})(MangaType || (exports.MangaType = MangaType = {}));
let Manga = class Manga {
    id;
    title;
    originalTitle;
    description;
    author;
    status;
    coverImage;
    sourceUrl;
    type;
    categories;
    chapters;
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
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Manga.prototype, "originalTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Manga.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Manga.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'ongoing' }),
    __metadata("design:type", String)
], Manga.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Manga.prototype, "coverImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Manga.prototype, "sourceUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MangaType,
        default: MangaType.TEXT
    }),
    __metadata("design:type", String)
], Manga.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => category_entity_1.Category, category => category.mangas),
    __metadata("design:type", Array)
], Manga.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chapter_entity_1.Chapter, chapter => chapter.manga),
    __metadata("design:type", Array)
], Manga.prototype, "chapters", void 0);
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