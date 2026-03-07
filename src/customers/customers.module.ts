import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './providers/providers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}