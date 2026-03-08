import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFashionHouseDto } from './dto/create-fashion-house.dto';
import { FashionHouseService } from './providers/fashion-house.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@ApiTags('Fashion Houses')
@ApiBearerAuth()
@Controller('fashion-houses')
export class FashionHouseController {
  constructor(private service: FashionHouseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a fashion house for the current user' })
  create(@Body() dto: CreateFashionHouseDto, @CurrentUser() user: any) {
    return this.service.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all fashion houses' })
  findAll() {
    return this.service.findAll();
  }
}