import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { UserRole } from 'src/user/entities/user.entity';

import { CreateParkingTypeDto } from './dto/create-parking-type.dto';
import { UpdateParkingTypeDto } from './dto/update-parking-type.dto';
import { ParkingTypeService } from './parking-type.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('parking-types')
export class ParkingTypeController {
  constructor(private readonly parkingTypeService: ParkingTypeService) {}

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.parkingTypeService.findOne(id);
  }

  @Get()
  getAll(@Query() { limit, offset }) {
    return this.parkingTypeService.findAll(limit, offset);
  }

  @Roles(UserRole.admin)
  @Post()
  create(@Body() input: CreateParkingTypeDto) {
    return this.parkingTypeService.create(input);
  }

  @Roles(UserRole.admin)
  @Patch('/:id')
  update(@Body() input: UpdateParkingTypeDto, @Param('id') id: string) {
    return this.parkingTypeService.update(id, input);
  }
}
