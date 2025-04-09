import { IsEmail, IsString, MinLength, IsOptional, IsArray } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsArray()
  roles?: Role[];

  @IsString()
  name: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  isActive?: boolean;
}

export class UpdateUserDto extends CreateUserDto {} 