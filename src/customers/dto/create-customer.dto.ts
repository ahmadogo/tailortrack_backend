import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Jane Doe', description: 'Customer name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '+2348012345678', description: 'Customer phone number' })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'jane@example.com',
    required: false,
    description: 'Customer email (optional)',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
