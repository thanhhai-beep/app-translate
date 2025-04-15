"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const gTTS = require('gtts');
let AudioService = class AudioService {
    async textToAudio(text, lang = 'vi') {
        const filename = `audio_${Date.now()}.mp3`;
        const filepath = path.join('uploads', filename);
        return new Promise((resolve, reject) => {
            const gtts = new gTTS(text, lang);
            gtts.save(filepath, (err) => {
                if (err)
                    return reject(err);
                resolve(filepath);
            });
        });
    }
};
exports.AudioService = AudioService;
exports.AudioService = AudioService = __decorate([
    (0, common_1.Injectable)()
], AudioService);
//# sourceMappingURL=audio.service.js.map