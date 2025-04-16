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
exports.Source = exports.SourceType = void 0;
const typeorm_1 = require("typeorm");
var SourceType;
(function (SourceType) {
    SourceType["MANGADEX"] = "MANGADEX";
    SourceType["MANGABAT"] = "MANGABAT";
    SourceType["MANGAFOX"] = "MANGAFOX";
    SourceType["MANMANAPP"] = "MANMANAPP";
    SourceType["CUSTOM"] = "CUSTOM";
    SourceType["TRUYENCHUHAY"] = "TRUYENCHUHAY";
})(SourceType || (exports.SourceType = SourceType = {}));
let Source = class Source {
    id;
    name;
    type;
    baseUrl;
    description;
    isActive;
    createdAt;
    updatedAt;
};
exports.Source = Source;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Source.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Source.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SourceType,
        default: SourceType.CUSTOM
    }),
    __metadata("design:type", String)
], Source.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Source.prototype, "baseUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Source.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Source.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Source.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Source.prototype, "updatedAt", void 0);
exports.Source = Source = __decorate([
    (0, typeorm_1.Entity)('sources')
], Source);
//# sourceMappingURL=source.entity.js.map