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
exports.TranslationService = exports.TranslationProvider = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const tesseract_js_1 = require("tesseract.js");
const fs = require("fs");
const path = require("path");
const https = require("https");
const openai_1 = require("openai");
var TranslationProvider;
(function (TranslationProvider) {
    TranslationProvider["DEEPL"] = "deepl";
    TranslationProvider["GPT"] = "gpt";
})(TranslationProvider || (exports.TranslationProvider = TranslationProvider = {}));
let TranslationService = class TranslationService {
    httpService;
    deeplApiKey;
    deeplApiUrl = 'https://api-free.deepl.com/v2/translate';
    openai;
    activeProvider = TranslationProvider.GPT;
    constructor(httpService) {
        this.httpService = httpService;
        const deeplKey = process.env.DEEPL_API_KEY;
        if (!deeplKey) {
            throw new Error('DEEPL_API_KEY is not set in environment variables');
        }
        this.deeplApiKey = deeplKey;
        const openaiKey = process.env.OPENAI_API_KEY;
        if (!openaiKey) {
            throw new Error('OPENAI_API_KEY is not set in environment variaes');
        }
        this.openai = new openai_1.default({
            apiKey: openaiKey,
        });
    }
    setActiveProvider(provider) {
        this.activeProvider = provider;
    }
    getActiveProvider() {
        return this.activeProvider;
    }
    async downloadImage(url) {
        const filename = path.basename(url);
        const filepath = path.join('uploads', filename);
        return new Promise((resolve, reject) => {
            https.get(url, (response) => {
                if (response.statusCode !== 200) {
                    reject(new Error(`Failed to download image: ${response.statusCode}`));
                    return;
                }
                const fileStream = fs.createWriteStream(filepath);
                response.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve(filepath);
                });
                fileStream.on('error', (err) => {
                    fs.unlink(filepath, () => reject(err));
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
    }
    async extractTextFromImage(imagePath) {
        const worker = await (0, tesseract_js_1.createWorker)('jpn');
        try {
            const { data: { text } } = await worker.recognize(imagePath);
            return text;
        }
        finally {
            await worker.terminate();
        }
    }
    async translateWithDeepL(text, targetLang = 'VI') {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.deeplApiUrl, {
                text: [text],
                target_lang: targetLang,
                source_lang: 'JA'
            }, {
                headers: {
                    'Authorization': `DeepL-Auth-Key ${this.deeplApiKey}`,
                    'Content-Type': 'application/json'
                }
            }));
            return response.data.translations[0].text;
        }
        catch (error) {
            console.error('DeepL translation error:', error);
            throw new Error('Failed to translate text with DeepL');
        }
    }
    async translateWithGPT(text, targetLang = 'Vietnamese') {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are a professional translator. Translate the following Japanese text to ${targetLang}. Keep the original meaning and context.`
                    },
                    {
                        role: "user",
                        content: text
                    }
                ],
                temperature: 0.3,
                max_tokens: 1000
            });
            const content = response.choices[0].message.content;
            if (!content) {
                throw new Error('No translation content received from GPT');
            }
            return content;
        }
        catch (error) {
            console.error('GPT translation error:', error);
            throw new Error('Failed to translate text with GPT');
        }
    }
    async translateText(text, targetLang = 'VI') {
        if (this.activeProvider === TranslationProvider.DEEPL) {
            return this.translateWithDeepL(text, targetLang);
        }
        else {
            return this.translateWithGPT(text, targetLang);
        }
    }
    async processImage(url) {
        let imagePath = null;
        try {
            imagePath = "uploads/chapters/1744296871804-510362735.png";
            const originalText = await this.extractTextFromImage(imagePath);
            const translatedText = await this.translateText(originalText);
            return {
                original: originalText,
                translated: translatedText,
                provider: this.activeProvider
            };
        }
        catch (error) {
            console.error('Process image error:', error);
            throw new Error('Failed to process image');
        }
        finally {
            if (imagePath && fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
    }
};
exports.TranslationService = TranslationService;
exports.TranslationService = TranslationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], TranslationService);
//# sourceMappingURL=translation.service.js.map