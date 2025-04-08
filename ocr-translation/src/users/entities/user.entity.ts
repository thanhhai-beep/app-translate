import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../../auth/enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column('text', { array: true, default: [Role.USER] })
  roles: Role[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  avatar: string;

  @Column('jsonb', { nullable: true })
  preferences: {
    language?: string;
    theme?: string;
    notifications?: boolean;
    [key: string]: any;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 