import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UpdateParkingTypeDto } from 'src/parking-lot/dto/update-parking-type.dto';
import { IsAdminGuard as IsParkingLotAdminGuard } from 'src/parking-lot/guards/is-admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { CreateParkingSpotDto } from './dto/create-parking-spot.dto';
import { ParkingSpotService } from './parking-spot.service';

const BASE_URI = '/parking-lots/:parkingLotId';

@SetMetadata('ID', 'parkingLotId')
@UseGuards(JwtAuthGuard)
@Controller(`${BASE_URI}/parking-spots`)
export class ParkingSpotController {
  constructor(private readonly parkingSpotService: ParkingSpotService) {}

  @Get('/:id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.parkingSpotService.findOne(id);
  }

  @Get()
  get(@Param('parkingLotId') parkingLotId: string) {
    return this.parkingSpotService.findAll(parkingLotId);
  }

  @UseGuards(IsParkingLotAdminGuard)
  @Post()
  create(
    @Body() input: CreateParkingSpotDto,
    @Param('parkingLotId') parkingLotId: string,
  ) {
    return this.parkingSpotService.create(parkingLotId, input);
  }

  @UseGuards(IsParkingLotAdminGuard)
  @Patch('/:id')
  update(
    @Body() input: UpdateParkingTypeDto,
    @Param('id') id: string,
    @Param('parkingLotId') parkingLotId: string,
  ) {
    return this.parkingSpotService.update(id, parkingLotId, input);
  }

  @UseGuards(IsParkingLotAdminGuard)
  @Delete('/:id')
  delete(@Param('id') id: string, @Param('parkingLotId') parkingLotId: string) {
    return this.parkingSpotService.delete(id, parkingLotId);
  }
}
