import { TranslationService } from './translation.service';
export declare class TranslationController {
    private readonly translationService;
    constructor(translationService: TranslationService);
    processImage(body: {
        url: string;
    }): Promise<{
        original: string;
        translated: string;
        provider: import("./translation.service").TranslationProvider;
    }>;
}
