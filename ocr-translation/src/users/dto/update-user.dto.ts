import { IsEmail, IsString, MinLength, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { Role } from '../../auth/enums/role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsArray()
  roles?: Role[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  preferences?: {
    language?: string;
    theme?: string;
    notifications?: boolean;
    [key: string]: any;
  };
} 