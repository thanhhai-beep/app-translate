import { Chapter } from '../../manga/entities/chapter.entity';
import { User } from '../../users/entities/user.entity';
export declare enum TranslationStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    REVIEWING = "REVIEWING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export declare class Translation {
    id: string;
    chapterId: string;
    chapter: Chapter;
    translatorId: string;
    translator: User;
    language: string;
    content: {
        pageNumber: number;
        textRegions: Array<{
            id: string;
            originalText: string;
            translatedText: string;
            confidence?: number;
        }>;
    }[];
    status: string;
    reviewerId: string;
    reviewer: User;
    reviewNotes: string;
    reviewedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    translatedText: any;
}
