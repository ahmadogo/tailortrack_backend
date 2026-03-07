import { Module } from '@nestjs/common';
import { FashionHouseController } from './fashion-house.controller';
import { FashionHouseService } from './providers/fashion-house.service';

@Module({
  controllers: [FashionHouseController],
  providers: [FashionHouseService]
})
export class FashionHouseModule {}
