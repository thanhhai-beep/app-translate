import { ChapterStatus } from '../entities/chapter.entity';
export declare class CreateChapterDto {
    chapterNumber: number;
    title: string;
    content?: string;
    status?: ChapterStatus;
    contentType?: 'text' | 'image';
}
