import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Unique email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6, description: 'Password (min 6 characters)' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: Role.TAILOR, enum: Role, description: 'Role of the user' })
  @IsEnum(Role)
  role: Role;
}
