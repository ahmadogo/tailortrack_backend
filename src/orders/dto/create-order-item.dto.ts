import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  garmentTypeId: number;

  @IsOptional()
  @IsString()
  fabric?: string;

  @IsOptional()
  @IsString()
  style?: string;

  @IsNumber()
  price: number;
}