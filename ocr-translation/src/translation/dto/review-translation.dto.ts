import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class ReviewTranslationDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['APPROVED', 'REJECTED', 'NEEDS_REVISION'])
  status: string;

  @IsNotEmpty()
  @IsString()
  reviewNotes: string;
} 