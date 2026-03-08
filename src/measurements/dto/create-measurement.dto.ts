import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMeasurementDto {
  @ApiProperty({ example: 15.5, description: 'Neck measurement in inches or cm' })
  @IsNumber()
  neck: number;

  @ApiProperty({
    example: 40,
    required: false,
    description: 'Chest measurement (optional)',
  })
  @IsOptional()
  @IsNumber()
  chest?: number;

  @ApiProperty({
    example: 32,
    required: false,
    description: 'Waist measurement (optional)',
  })
  @IsOptional()
  @IsNumber()
  waist?: number;

  @ApiProperty({ example: 18, description: 'Shoulder measurement' })
  @IsNumber()
  shoulder: number;

  @ApiProperty({ example: 24, description: 'Sleeve length' })
  @IsNumber()
  sleeve: number;

  @ApiProperty({
    example: 38,
    required: false,
    description: 'Hip measurement (optional)',
  })
  @IsOptional()
  @IsNumber()
  hip?: number;

  @ApiProperty({
    example: 30,
    required: false,
    description: 'Inseam measurement (optional)',
  })
  @IsOptional()
  @IsNumber()
  inseam?: number;

  @ApiProperty({
    example: 'Customer prefers slim fit',
    required: false,
    description: 'Additional notes (optional)',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}