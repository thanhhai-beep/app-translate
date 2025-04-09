export declare class CreateChapterDto {
    chapterNumber: number;
    title: string;
    originalTitle: string;
    description?: string;
    pageUrls?: string[];
    status?: string;
    sourceLanguage?: string;
    targetLanguages?: string[];
}
export declare class UpdateChapterDto extends CreateChapterDto {
}
