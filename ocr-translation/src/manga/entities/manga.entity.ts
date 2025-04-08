import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Chapter } from './chapter.entity';

export enum MangaStatus {
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  HIATUS = 'HIATUS',
  DROPPED = 'DROPPED'
}

export enum MangaType {
  MANGA = 'MANGA',
  MANHWA = 'MANHWA',
  MANHUA = 'MANHUA',
  NOVEL = 'NOVEL'
}

@Entity('manga')
export class Manga {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ name: 'original_title' })
  originalTitle: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  artist: string;

  @Column({ nullable: true })
  publisher: string;

  @Column({ nullable: true })
  status: string;

  @Column('text', { array: true, nullable: true })
  genres: string[];

  @Column({ name: 'cover_image', nullable: true })
  coverImage: string;

  @Column({ name: 'source_language', nullable: true })
  sourceLanguage: string;

  @Column('text', { name: 'target_languages', array: true, nullable: true })
  targetLanguages: string[];

  @OneToMany(() => Chapter, (chapter) => chapter.manga)
  chapters: Chapter[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    author?: string;
    artist?: string;
    publisher?: string;
    releaseYear?: number;
    rating?: number;
  };

  @Column({ type: 'jsonb', nullable: true })
  translation: {
    sourceLanguage: string;
    targetLanguages: string[];
    team?: string;
    status: string;
  };

  @OneToMany(() => Chapter, chapter => chapter.manga)
  chapters: Chapter[];

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  favoriteCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 