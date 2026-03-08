import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // Create a new order
  public async create(dto: CreateOrderDto, user: any) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: dto.customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const measurement = await this.prisma.measurement.findUnique({
      where: { id: dto.measurementId },
    });

    if (!measurement) {
      throw new NotFoundException('Measurement not found');
    }

    if (user.fashionHouseId) {
      return this.prisma.order.create({
        data: {
          customerId: dto.customerId,
          measurementId: dto.measurementId,
          totalPrice: dto.totalPrice,
          fashionHouseId: user.fashionHouseId,
        },
      });
    }

    return this.prisma.order.create({
      data: {
        customerId: dto.customerId,
        measurementId: dto.measurementId,
        totalPrice: dto.totalPrice,
        tailorUserId: user.id,
      },
    });
  }

  // Get all orders for the authenticated user
  public async findAll(user: any) {
    if (user.fashionHouseId) {
      return this.prisma.order.findMany({
        where: {
          fashionHouseId: user.fashionHouseId,
        },
        include: {
          customer: true,
          measurement: true,
        },
      });
    }

    return this.prisma.order.findMany({
      where: {
        tailorUserId: user.id,
      },
      include: {
        customer: true,
        measurement: true,
      },
    });
  }

  // Get a single order by ID
  public async findOne(id: number, user: any) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        measurement: true,
      },
    });

    if (!order) {
      throw new NotFoundException();
    }

    if (
      order.fashionHouseId !== user.fashionHouseId &&
      order.tailorUserId !== user.id
    ) {
      throw new ForbiddenException();
    }

    return order;
  }

  // Update the status of an order
  public async updateStatus(id: number, dto: UpdateOrderStatusDto) {
    return this.prisma.order.update({
      where: { id },
      data: {
        status: dto.status,
      },
    });
  }

  // Remove an order
  public async remove(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
