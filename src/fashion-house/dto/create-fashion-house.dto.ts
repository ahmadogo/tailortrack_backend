import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFashionHouseDto {
  @ApiProperty({ example: 'Elite Tailors', description: 'Name of the fashion house' })
  @IsString()
  name: string;

  @ApiProperty({
    example: '123 Victoria Island, Lagos',
    description: 'Physical address of the fashion house',
  })
  @IsString()
  address: string;
}
