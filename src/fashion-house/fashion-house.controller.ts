import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CreateFashionHouseDto } from './dto/create-fashion-house.dto';
import { FashionHouseService } from './providers/fashion-house.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('fashion-houses')
export class FashionHouseController {
  constructor(private service: FashionHouseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateFashionHouseDto, @CurrentUser() user: any) {
    return this.service.create(user.id, dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}