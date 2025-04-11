import { ChapterStatus, ChapterType } from '../entities/chapter.entity';
export declare class CreateChapterDto {
    mangaId: string;
    chapterNumber: number;
    title: string;
    content?: string;
    ChapterType: ChapterType;
    status?: ChapterStatus;
}
