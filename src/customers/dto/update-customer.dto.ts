import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @ApiProperty({
    example: 'Jane Updated',
    required: false,
    description: 'Updated customer name (optional)',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: '+2348098765432',
    required: false,
    description: 'Updated customer phone number (optional)',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: 'jane.new@example.com',
    required: false,
    description: 'Updated customer email (optional)',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}