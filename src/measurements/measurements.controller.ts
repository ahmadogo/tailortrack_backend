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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { MeasurementsService } from './providers/measurements.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Measurements')
@ApiBearerAuth()
@Controller('measurements')
@UseGuards(JwtAuthGuard)
export class MeasurementsController {
  constructor(private measurementsService: MeasurementsService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('TAILOR')
  @ApiOperation({ summary: 'Get all measurements for customers created by the current user or fashion house' })
  findUserMeasurements(@Req() req) {
    return this.measurementsService.findUserMeasurements(req.user);
  }

  // Endpoint to create a new measurement for a specific customer
  @Post(':customerId')
  @UseGuards(RolesGuard)
  @Roles('TAILOR')
  @ApiOperation({ summary: 'Create a new measurement for a specific customer' })
  create(
    @Param('customerId') customerId: string,
    @Body() dto: CreateMeasurementDto,
    @Req() req,
  ) {
    return this.measurementsService.create(Number(customerId), dto, req.user);
  }

  // Endpoint to get all measurements for a specific customer
  @Get('customer/:customerId')
  @UseGuards(RolesGuard)
  @Roles('TAILOR')
  @ApiOperation({ summary: 'Get all measurements for a specific customer' })
  findCustomerMeasurements(
    @Param('customerId') customerId: string,
    @Req() req,
  ) {
    return this.measurementsService.findCustomerMeasurements(
      Number(customerId),
      req.user,
    );
  }

  // Endpoint to get a specific measurement by its ID
  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('TAILOR')
  @ApiOperation({ summary: 'Get a single measurement by ID' })
  findOne(@Param('id') id: string) {
    return this.measurementsService.findOne(Number(id));
  }

  // Endpoint to update a specific measurement by its ID
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('TAILOR')
  @ApiOperation({ summary: 'Update a measurement by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateMeasurementDto) {
    return this.measurementsService.update(Number(id), dto);
  }

  // Endpoint to delete a specific measurement by its ID
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('TAILOR')
  @ApiOperation({ summary: 'Delete a measurement by ID' })
  remove(@Param('id') id: string) {
    return this.measurementsService.remove(Number(id));
  }
}
