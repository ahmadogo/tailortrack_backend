import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { CreateGarmentTypeDto } from '../dto/create-garment-type.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // Create a new order
  public async createOrder(dto: CreateOrderDto, user: any) {
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
    if (measurement.customerId !== dto.customerId) {
      throw new ForbiddenException(
        'Measurement does not belong to the customer',
      );
    }

    // Fashion house order
    if (user.fashionHouseId) {
      return this.prisma.order.create({
        data: {
          customerId: dto.customerId,
          measurementId: dto.measurementId,
          totalPrice: dto.totalPrice,
          fashionHouseId: user.fashionHouseId,
          items: {
            create: dto.items,
          },
        },
        include: {
          items: {
            include: {
              garmentType: true,
            },
          },
        },
      });
    }

    // Independent tailor order
    return this.prisma.order.create({
      data: {
        customerId: dto.customerId,
        measurementId: dto.measurementId,
        totalPrice: dto.totalPrice,
        tailorUserId: user.id,
        items: {
          create: dto.items,
        },
      },
      include: {
        items: {
          include: {
            garmentType: true,
          },
        },
      },
    });
  }

  // Create a new garment type
  public async createGarmentType(dto: CreateGarmentTypeDto) {
    const existing = await this.prisma.garmentType.findUnique({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException('Garment type already exists');
    }

    return this.prisma.garmentType.create({
      data: {
        name: dto.name,
      },
    });
  }

  // Get all garment types
  public async findAllGarments() {
    return this.prisma.garmentType.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get all orders for the authenticated user
  public async findAllOrders(user: any) {
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
        items: {
          include: {
            garmentType: true,
          },
        },
      },
    });
  }

  // Get a single order by ID
  public async findOneOrder(id: number, user: any) {
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

  // Update the status of an order item
  public async updateItemStatus(id: number, dto: UpdateOrderStatusDto) {
    return this.prisma.orderItem.update({
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
