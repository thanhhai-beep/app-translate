import { HttpService } from '@nestjs/axios';
export declare enum TranslationProvider {
    DEEPL = "deepl",
    GPT = "gpt"
}
export declare class TranslationService {
    private readonly httpService;
    private readonly deeplApiKey;
    private readonly deeplApiUrl;
    private readonly openai;
    private activeProvider;
    constructor(httpService: HttpService);
    setActiveProvider(provider: TranslationProvider): void;
    getActiveProvider(): TranslationProvider;
    downloadImage(url: string): Promise<string>;
    extractTextFromImage(imagePath: string): Promise<string>;
    translateWithDeepL(text: string, targetLang?: string): Promise<string>;
    translateWithGPT(text: string, targetLang?: string): Promise<string>;
    translateText(text: string, targetLang?: string): Promise<string>;
    processImage(url: string): Promise<{
        original: string;
        translated: string;
        provider: TranslationProvider;
    }>;
}
