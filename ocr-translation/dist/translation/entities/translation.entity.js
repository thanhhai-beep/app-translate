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
exports.Translation = exports.TranslationStatus = void 0;
const typeorm_1 = require("typeorm");
const chapter_entity_1 = require("../../manga/entities/chapter.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var TranslationStatus;
(function (TranslationStatus) {
    TranslationStatus["PENDING"] = "PENDING";
    TranslationStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TranslationStatus["REVIEWING"] = "REVIEWING";
    TranslationStatus["APPROVED"] = "APPROVED";
    TranslationStatus["REJECTED"] = "REJECTED";
})(TranslationStatus || (exports.TranslationStatus = TranslationStatus = {}));
let Translation = class Translation {
    id;
    chapterId;
    chapter;
    translatorId;
    translator;
    language;
    content;
    status;
    reviewerId;
    reviewer;
    reviewNotes;
    reviewedAt;
    createdAt;
    updatedAt;
    translatedText;
};
exports.Translation = Translation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Translation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'chapter_id' }),
    __metadata("design:type", String)
], Translation.prototype, "chapterId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chapter_entity_1.Chapter, (chapter) => chapter.translations),
    (0, typeorm_1.JoinColumn)({ name: 'chapter_id' }),
    __metadata("design:type", chapter_entity_1.Chapter)
], Translation.prototype, "chapter", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'translator_id' }),
    __metadata("design:type", String)
], Translation.prototype, "translatorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'translator_id' }),
    __metadata("design:type", user_entity_1.User)
], Translation.prototype, "translator", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Translation.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], Translation.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Translation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewer_id', nullable: true }),
    __metadata("design:type", String)
], Translation.prototype, "reviewerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'reviewer_id' }),
    __metadata("design:type", user_entity_1.User)
], Translation.prototype, "reviewer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'review_notes', nullable: true }),
    __metadata("design:type", String)
], Translation.prototype, "reviewNotes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_at', nullable: true }),
    __metadata("design:type", Date)
], Translation.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Translation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Translation.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], Translation.prototype, "translatedText", void 0);
exports.Translation = Translation = __decorate([
    (0, typeorm_1.Entity)('translation')
], Translation);
//# sourceMappingURL=translation.entity.js.map