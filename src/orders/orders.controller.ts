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
import { CreateGarmentTypeDto } from './dto/create-garment-type.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.TAILOR, Role.FASHION_HOUSE)
  createOrder(@Body() dto: CreateOrderDto, @Req() req) {
    return this.ordersService.createOrder(dto, req.user);
  }

  @Post('garment')
  @UseGuards(RolesGuard)
  @Roles(Role.TAILOR, Role.FASHION_HOUSE)
  createGarmentType(@Body() dto: CreateGarmentTypeDto) {
    return this.ordersService.createGarmentType(dto);
  }

  @Get('garments')
  @UseGuards(RolesGuard)
  @Roles(Role.TAILOR, Role.FASHION_HOUSE)
  findAllGarments() {
    return this.ordersService.findAllGarments();
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.TAILOR, Role.FASHION_HOUSE)
  findAllOrders(@Req() req) {
    return this.ordersService.findAllOrders(req.user);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.TAILOR, Role.FASHION_HOUSE)
  findOne(@Param('id') id: string, @Req() req) {
    return this.ordersService.findOneOrder(Number(id), req.user);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(Role.TAILOR, Role.FASHION_HOUSE)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(Number(id), dto);
  }

  @Patch('items/:id/status')
  @UseGuards(RolesGuard)
  @Roles(Role.TAILOR, Role.FASHION_HOUSE)
  updateItemStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateItemStatus(+id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.TAILOR, Role.FASHION_HOUSE)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(Number(id));
  }
}
