import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCustomerDto, user: any) {
    return this.prisma.customer.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        createdByUserId: user.fashionHouseId ? null : user.id,
        createdByFashionHouseId: user.fashionHouseId ?? null,
      },
    }); 
  }

  async findAll(user: any) {
    if (user.fashionHouseId) {
      return this.prisma.customer.findMany({
        where: {
          createdByFashionHouseId: user.fashionHouseId,
        },
      });
    }

    return this.prisma.customer.findMany({
      where: {
        createdByUserId: user.id,
      },
    });
  }

  async findOne(id: number, user: any) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (
      customer.createdByUserId !== user.id &&
      customer.createdByFashionHouseId !== user.fashionHouseId
    ) {
      throw new ForbiddenException();
    }

    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto, user: any) {
    await this.findOne(id, user);

    return this.prisma.customer.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number, user: any) {
    await this.findOne(id, user);

    return this.prisma.customer.delete({
      where: { id },
    });
  }
}