import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';

export class UpdateChapterDto {
  @IsNumber()
  @IsOptional()
  chapterNumber?: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(['text', 'image'])
  @IsOptional()
  contentType?: 'text' | 'image';

  @IsEnum(['draft', 'published', 'archived'])
  @IsOptional()
  status?: 'draft' | 'published' | 'archived';
} 