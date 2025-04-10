export declare class UpdateChapterDto {
    chapterNumber?: number;
    title?: string;
    content?: string;
    contentType?: 'text' | 'image';
    status?: 'draft' | 'published' | 'archived';
}
