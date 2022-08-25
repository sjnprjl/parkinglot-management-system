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
import { Roles } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { UserRole } from 'src/user/entities/user.entity';
import { CreateParkingLotDto } from './dto/create-parking-lot.dto';
import { UpdateParkingLotDto } from './dto/update-parking-lot.dto';
import { IsAdmin } from './guards/is-admin.guard';
import { ParkingLotService } from './parking-lot.service';

@UseGuards(JwtAuthGuard)
@Controller('parking-lot')
export class ParkingLotController {
  constructor(private readonly parkingLotService: ParkingLotService) {}

  @Get()
  find(@Query() { limit, offset }: { limit: number; offset: number }) {
    return this.parkingLotService.find(limit, offset);
  }

  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.parkingLotService.findOne(id);
  }

  @UseGuards(IsAdmin)
  @Post()
  create(@Body() createParkingLotDto: CreateParkingLotDto) {
    return this.parkingLotService.create(createParkingLotDto);
  }

  @UseGuards(IsAdmin)
  @Patch('/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateParkingLotDto: UpdateParkingLotDto,
  ) {
    return this.parkingLotService.update(id, updateParkingLotDto);
  }

  @UseGuards(IsAdmin)
  @Delete('/:id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.parkingLotService.delete(id);
  }
}
