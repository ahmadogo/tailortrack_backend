import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateFashionHouseDto } from '../dto/create-fashion-house.dto';

@Injectable()
export class FashionHouseService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: number, data: CreateFashionHouseDto) {
    return this.prisma.fashionHouse.create({
      data: {
        name: data.name,
        address: data.address,
        ownerId,
      },
    });
  }

  async findAll() {
    return this.prisma.fashionHouse.findMany({
      include: {
        owner: true,
        staff: true,
      },
    });
  }
}