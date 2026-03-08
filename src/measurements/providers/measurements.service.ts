import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMeasurementDto } from '../dto/create-measurement.dto';
import { UpdateMeasurementDto } from '../dto/update-measurement.dto';

@Injectable()
export class MeasurementsService {
  constructor(private prisma: PrismaService) {}

  // Create a new measurement for a specific customer
  public async create(customerId: number, dto: CreateMeasurementDto, user: any) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
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

    const data: Prisma.MeasurementUncheckedCreateInput = {
      customerId,
      neck: dto.neck,
      chest: (dto.chest ?? null) as any,
      waist: (dto.waist ?? null) as any,
      shoulder: dto.shoulder,
      sleeve: dto.sleeve,
      hip: (dto.hip ?? null) as any,
      inseam: (dto.inseam ?? null) as any,
      notes: dto.notes ?? null,
    };

    const measurement = await this.prisma.measurement.create({
      data,
    });

    return {
      message: `New measurement added for customer ${customer.name}`,
      measurement,
    };
  }

  // Get all measurements for a specific customer
  public async findCustomerMeasurements(customerId: number, user: any) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException();
    }

    if (
      customer.createdByUserId !== user.id &&
      customer.createdByFashionHouseId !== user.fashionHouseId
    ) {
      throw new ForbiddenException();
    }

    const measurements = await this.prisma.measurement.findMany({
      where: { customerId },
    });

    return {
      message: `Measurements retrieved for customer ${customer.name}`,
      measurements,
    };
  }

  public async findUserMeasurements(user: any) {
    if (user.fashionHouseId) {
      const measurements = await this.prisma.measurement.findMany({
        where: {
          customer: {
            createdByFashionHouseId: user.fashionHouseId,
          },
        },
        include: { customer: true },
      });

      return {
        message: 'Measurements retrieved for your fashion house customers',
        measurements,
      };
    }

    const measurements = await this.prisma.measurement.findMany({
      where: {
        customer: {
          createdByUserId: user.id,
        },
      },
      include: { customer: true },
    });

    return {
      message: 'Measurements retrieved for your customers',
      measurements,
    };
  }

  // Get a specific measurement by ID
  public async findOne(id: number) {
    const measurement = await this.prisma.measurement.findUnique({
      where: { id },
      include: { customer: true },
    });

    if (!measurement) {
      throw new NotFoundException('Measurement not found');
    }

    return {
      message: `Measurement details for customer ${measurement.customer.name}`,
      measurement,
    };
  }

  // Update a customers measurement 
  public async update(id: number, dto: UpdateMeasurementDto) {
    const existing = await this.prisma.measurement.findUnique({
      where: { id },
      include: { customer: true },
    });

    if (!existing) {
      throw new NotFoundException('Measurement not found');
    }

    const updatedMeasurement = await this.prisma.measurement.update({
      where: { id },
      data: dto,
      include: { customer: true },
    });

    return {
      message: `Measurement updated for customer ${updatedMeasurement.customer.name}`,
      measurement: updatedMeasurement,
    };
  }

  // Delete a customers measurement
  public async remove(id: number) {
    const existing = await this.prisma.measurement.findUnique({
      where: { id },
      include: { customer: true },
    });

    if (!existing) {
      throw new NotFoundException('Measurement not found');
    }

    const deletedMeasurement = await this.prisma.measurement.delete({
      where: { id },
      include: { customer: true },
    });

    return {
      message: `Measurement deleted for customer ${deletedMeasurement.customer.name}`,
      measurement: deletedMeasurement,
    };
  }
}