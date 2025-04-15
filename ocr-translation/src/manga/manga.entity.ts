import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from 'typeorm';
import { Chapter } from '../chapters/chapter.entity';
import { Category } from '../categories/category.entity';

export enum MangaType {
  COMIC = 'comic',
  TEXT = 'text',
  IMPORT = "import"
}

@Entity('manga')
export class Manga {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  originalTitle: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  author: string;

  @Column({ default: 'ongoing' })
  status: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ nullable: true })
  sourceUrl: string;

  @Column({
    type: 'enum',
    enum: MangaType,
    default: MangaType.TEXT
  })
  type: MangaType;

  @ManyToMany(() => Category, category => category.mangas)
  categories: Category[];

  @OneToMany(() => Chapter, chapter => chapter.manga)
  chapters: Chapter[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 