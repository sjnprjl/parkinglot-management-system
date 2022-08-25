import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../shared/guards/jwt.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserRole } from '../user/entities/user.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

import { LocationService } from './location.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  getAll(@Query() { limit, offset }) {
    return this.locationService.find(limit, offset);
  }

  @Get('/:id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.locationService.findOneById(id);
  }

  @Roles(UserRole.admin, UserRole.superadmin)
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Roles(UserRole.admin, UserRole.superadmin)
  @Patch('/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Roles(UserRole.admin, UserRole.superadmin)
  @Delete('/:id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.locationService.delete(id);
  }
}
