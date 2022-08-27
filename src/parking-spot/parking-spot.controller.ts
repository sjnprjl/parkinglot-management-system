import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IsAdminGuard as IsParkingLotAdminGuard } from 'src/parking-lot/guards/is-admin.guard';

const BASE_URI = '/parking-lots/:parkingLotId';

@Controller(`${BASE_URI}/parking-spots`)
export class ParkingSpotController {
  @Get('/:id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {}

  @Get()
  get() {}

  @UseGuards(IsParkingLotAdminGuard)
  @Post()
  create() {}

  @UseGuards(IsParkingLotAdminGuard)
  @Patch('/:id')
  update() {}

  @UseGuards(IsParkingLotAdminGuard)
  @Delete('/:id')
  delete() {}
}
