import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum CredentialType {
  GOOGLE_CLOUD = 'GOOGLE_CLOUD',
  AWS = 'AWS',
  FIREBASE = 'FIREBASE',
  OTHER = 'OTHER'
}

@Entity('credentials')
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: CredentialType,
    default: CredentialType.OTHER
  })
  type: CredentialType;

  @Column()
  name: string;

  @Column({ type: 'json' })
  config: Record<string, any>;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 