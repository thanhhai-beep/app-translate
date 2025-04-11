import { ChapterType, ChapterStatus } from '../entities/chapter.entity';
export declare class UpdateChapterDto {
    chapterNumber?: number;
    title?: string;
    content?: string;
    type?: ChapterType;
    contentType?: ChapterType;
    status?: ChapterStatus;
    images?: string[];
}
