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
exports.Credential = exports.CredentialType = void 0;
const typeorm_1 = require("typeorm");
var CredentialType;
(function (CredentialType) {
    CredentialType["GOOGLE_CLOUD"] = "GOOGLE_CLOUD";
    CredentialType["AWS"] = "AWS";
    CredentialType["FIREBASE"] = "FIREBASE";
    CredentialType["OTHER"] = "OTHER";
})(CredentialType || (exports.CredentialType = CredentialType = {}));
let Credential = class Credential {
    id;
    type;
    name;
    config;
    isActive;
    description;
    createdAt;
    updatedAt;
};
exports.Credential = Credential;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Credential.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CredentialType,
        default: CredentialType.OTHER
    }),
    __metadata("design:type", String)
], Credential.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Credential.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], Credential.prototype, "config", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Credential.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Credential.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Credential.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Credential.prototype, "updatedAt", void 0);
exports.Credential = Credential = __decorate([
    (0, typeorm_1.Entity)('credentials')
], Credential);
//# sourceMappingURL=credentials.entity.js.map