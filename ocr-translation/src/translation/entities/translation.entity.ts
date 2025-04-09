import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Chapter } from '../../manga/entities/chapter.entity';
import { User } from '../../users/entities/user.entity';

export enum TranslationStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEWING = 'REVIEWING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

@Entity('translation')
export class Translation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'chapter_id' })
  chapterId: string;

  @ManyToOne(() => Chapter, (chapter) => chapter.translations)
  @JoinColumn({ name: 'chapter_id' })
  chapter: Chapter;

  @Column({ name: 'translator_id' })
  translatorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'translator_id' })
  translator: User;

  @Column()
  language: string;

  @Column('json')
  content: {
    pageNumber: number;
    textRegions: Array<{
      id: string;
      originalText: string;
      translatedText: string;
      confidence?: number;
    }>;
  }[];

  @Column({ nullable: true })
  status: string;

  @Column({ name: 'reviewer_id', nullable: true })
  reviewerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: User;

  @Column({ name: 'review_notes', nullable: true })
  reviewNotes: string;

  @Column({ name: 'reviewed_at', nullable: true })
  reviewedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column('json')
  translatedText: any;
} 