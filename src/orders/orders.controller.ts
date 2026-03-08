import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { OrdersService } from './providers/orders.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.TAILOR, Role.FASHION_HOUSE)
  create(@Body() dto: CreateOrderDto, @Req() req) {
    return this.ordersService.create(dto, req.user);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.TAILOR, Role.FASHION_HOUSE)
  findAll(@Req() req) {
    return this.ordersService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.TAILOR, Role.FASHION_HOUSE)
  findOne(@Param('id') id: string, @Req() req) {
    return this.ordersService.findOne(Number(id), req.user);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(Role.TAILOR, Role.FASHION_HOUSE)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(Number(id), dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.TAILOR, Role.FASHION_HOUSE)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(Number(id));
  }
}
