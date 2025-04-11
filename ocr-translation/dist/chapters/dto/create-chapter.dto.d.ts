import { ChapterStatus, ContentType } from '../entities/chapter.entity';
export declare class CreateChapterDto {
    mangaId: string;
    chapterNumber: number;
    title: string;
    content?: string;
    contentType: ContentType;
    status?: ChapterStatus;
}
