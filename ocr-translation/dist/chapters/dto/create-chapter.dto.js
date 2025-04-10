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
exports.CreateChapterDto = void 0;
const class_validator_1 = require("class-validator");
const chapter_entity_1 = require("../entities/chapter.entity");
const class_transformer_1 = require("class-transformer");
class CreateChapterDto {
    chapterNumber;
    title;
    content;
    status;
    contentType;
}
exports.CreateChapterDto = CreateChapterDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateChapterDto.prototype, "chapterNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChapterDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateChapterDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(chapter_entity_1.ChapterStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateChapterDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateChapterDto.prototype, "contentType", void 0);
//# sourceMappingURL=create-chapter.dto.js.map