import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CustomersService } from './providers/providers.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@ApiTags('Customers')
@ApiBearerAuth()
@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.TAILOR)
  @ApiOperation({ summary: 'Create a new customer' })
  create(@Body() dto: CreateCustomerDto, @CurrentUser() user: any) {
    return this.customersService.create(dto, user);
  }

  @Get()
  @Roles(Role.TAILOR)
  @ApiOperation({ summary: 'Get all customers created by the current user' })
  findAll(@CurrentUser() user: any) {
    return this.customersService.findAll(user);
  }

  @Get(':id')
  @Roles(Role.TAILOR)
  @ApiOperation({ summary: 'Get a single customer by ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.customersService.findOne(Number(id), user);
  }

  @Patch(':id')
  @Roles(Role.TAILOR)
  @ApiOperation({ summary: 'Update a customer by ID' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
    @CurrentUser() user: any,
  ) {
    return this.customersService.update(Number(id), dto, user);
  }

  @Delete(':id')
  @Roles(Role.TAILOR)
  @ApiOperation({ summary: 'Delete a customer by ID' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.customersService.remove(Number(id), user);
  }
}
