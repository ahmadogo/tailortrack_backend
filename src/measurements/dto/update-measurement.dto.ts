import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMeasurementDto {
  @ApiProperty({ example: 16, required: false, description: 'Updated neck measurement (optional)' })
  @IsOptional()
  @IsNumber()
  neck?: number;

  @ApiProperty({ example: 41, required: false, description: 'Updated chest measurement (optional)' })
  @IsOptional()
  @IsNumber()
  chest?: number;

  @ApiProperty({ example: 33, required: false, description: 'Updated waist measurement (optional)' })
  @IsOptional()
  @IsNumber()
  waist?: number;

  @ApiProperty({ example: 18.5, required: false, description: 'Updated shoulder measurement (optional)' })
  @IsOptional()
  @IsNumber()
  shoulder?: number;

  @ApiProperty({ example: 24.5, required: false, description: 'Updated sleeve measurement (optional)' })
  @IsOptional()
  @IsNumber()
  sleeve?: number;

  @ApiProperty({ example: 39, required: false, description: 'Updated hip measurement (optional)' })
  @IsOptional()
  @IsNumber()
  hip?: number;

  @ApiProperty({ example: 31, required: false, description: 'Updated inseam measurement (optional)' })
  @IsOptional()
  @IsNumber()
  inseam?: number;

  @ApiProperty({
    example: 'Adjusted after second fitting',
    required: false,
    description: 'Updated notes (optional)',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
