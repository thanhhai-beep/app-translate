import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum SourceType {
  MANGADEX = 'MANGADEX',
  MANGABAT = 'MANGABAT',
  MANGAFOX = 'MANGAFOX',
  MANMANAPP = 'MANMANAPP',
  CUSTOM = 'CUSTOM',
}

@Entity('sources')
export class Source {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: SourceType,
    default: SourceType.CUSTOM
  })
  type: SourceType;

  @Column()
  baseUrl: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 