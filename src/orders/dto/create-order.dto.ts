import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  customerId: number;

  @IsNumber()
  measurementId: number;

  @IsNumber()
  totalPrice: number;
}