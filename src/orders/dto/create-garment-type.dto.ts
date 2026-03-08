import { IsString } from 'class-validator';

export class CreateGarmentTypeDto {
  @IsString()
  name: string;
}
