import { IsString } from 'class-validator';

export class CreateFashionHouseDto {
  @IsString()
  name: string;

  @IsString()
  address: string;
}
