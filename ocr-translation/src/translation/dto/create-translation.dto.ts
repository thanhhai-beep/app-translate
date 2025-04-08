import { IsNotEmpty, IsString, IsUUID, IsObject } from 'class-validator';

export class CreateTranslationDto {
  @IsNotEmpty()
  @IsString()
  language: string;

  @IsNotEmpty()
  @IsObject()
  content: Record<string, string>;

  @IsNotEmpty()
  @IsUUID()
  chapterId: string;
} 