import { ChapterType, ChapterStatus } from '../entities/chapter.entity';
import { ContentType } from '../entities/chapter.entity';
export declare class UpdateChapterDto {
    chapterNumber?: number;
    title?: string;
    content?: string;
    type?: ChapterType;
    contentType?: ContentType;
    status?: ChapterStatus;
    images?: string[];
}
