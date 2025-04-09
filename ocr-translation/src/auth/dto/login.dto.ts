import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'The email of the admin user',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the admin user',
  })
  password: string;
} 