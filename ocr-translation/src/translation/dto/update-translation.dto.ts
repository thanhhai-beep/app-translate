import { IsString, IsObject, IsOptional } from 'class-validator';

export class UpdateTranslationDto {
  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsObject()
  content?: Record<string, string>;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  reviewNotes?: string;
} 