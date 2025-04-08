import { IsString, IsNumber, IsOptional, IsArray, IsUrl } from 'class-validator';

export class UpdateChapterDto {
  @IsOptional()
  @IsNumber()
  chapterNumber?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  originalTitle?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  pageUrls?: string[];

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  sourceLanguage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetLanguages?: string[];
} 