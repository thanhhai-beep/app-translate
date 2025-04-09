import { IsString, IsNumber, IsOptional, IsArray, IsUrl } from 'class-validator';

export class CreateChapterDto {
  @IsNumber()
  chapterNumber: number;

  @IsString()
  title: string;

  @IsString()
  originalTitle: string;

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

export class UpdateChapterDto extends CreateChapterDto {} 