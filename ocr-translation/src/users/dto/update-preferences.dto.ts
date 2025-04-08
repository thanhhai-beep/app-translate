import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdatePreferencesDto {
  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  theme?: string;

  @IsOptional()
  @IsBoolean()
  notifications?: boolean;

  @IsOptional()
  [key: string]: any;
} 