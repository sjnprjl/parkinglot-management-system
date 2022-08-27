import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingTypeService } from 'src/parking-type/parking-type.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { Repository } from 'typeorm';
import { CreateParkingLotDto } from './dto/create-parking-lot.dto';
import { CreateParkingSpotTypeDto } from './dto/create-parking-type.dto';
import { UpdateParkingLotDto } from './dto/update-parking-lot.dto';
import { UpdateParkingTypeDto } from './dto/update-parking-type.dto';
import { ParkingLotParkingSpotType } from './entities/parking-lot_parking-type.entity';
import { IsAdminGuard } from './guards/is-admin.guard';
import { ParkingLotService } from './parking-lot.service';

@UseGuards(JwtAuthGuard)
@Controller('parking-lots')
export class ParkingLotController {
  constructor(
    private readonly parkingLotService: ParkingLotService,
    private readonly parkingTypeService: ParkingTypeService,
    @InjectRepository(ParkingLotParkingSpotType)
    private readonly parkingLotParkingSpotTypeRepo: Repository<ParkingLotParkingSpotType>,
  ) {}

  @Get()
  find(@Query() { limit, offset }: { limit: number; offset: number }) {
    return this.parkingLotService.find(limit, offset);
  }

  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.parkingLotService.findOne(id);
  }

  @UseGuards(IsAdminGuard)
  @Post()
  create(@Body() createParkingLotDto: CreateParkingLotDto) {
    return this.parkingLotService.create(createParkingLotDto);
  }

  @UseGuards(IsAdminGuard)
  @Patch('/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateParkingLotDto: UpdateParkingLotDto,
  ) {
    return this.parkingLotService.update(id, updateParkingLotDto);
  }

  @UseGuards(IsAdminGuard)
  @Delete('/:id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.parkingLotService.delete(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id/parking-types')
  async getAllTypes(@Param('id') id: string) {
    return await this.parkingLotParkingSpotTypeRepo.find({
      where: {
        parkingLotId: id,
      },
      relations: ['parkingSpotType', 'parkingLot'],
      select: {
        parkingSpotType: {
          id: true,
          type: true,
        },
        parkingLot: {
          id: true,
          name: true,
        },
      },
    });
  }

  @UseGuards(IsAdminGuard)
  @Post('/:id/parking-types')
  async createParkingSpotType(
    @Param('id') id: string,
    @Body() createParkingSpotType: CreateParkingSpotTypeDto,
  ) {
    await this.parkingLotService.findOne(id);
    await this.parkingTypeService.findOne(
      createParkingSpotType.parkingSpotTypeId,
    );
    return await this.parkingLotParkingSpotTypeRepo.save({
      ...createParkingSpotType,
      parkingLotId: id,
    });
  }

  @UseGuards(IsAdminGuard)
  @Patch('/:parkingLotId/parking-types/:parkingTypeId')
  async updateParkingSpotType(
    @Param('parkingLotId') parkingLotId: string,
    @Param('parkingTypeId') parkingTypeId: string,
    @Body() input: UpdateParkingTypeDto,
  ) {
    return await this.parkingLotParkingSpotTypeRepo.update(
      {
        // parkingLotId,
        id: parkingTypeId,
      },
      input,
    );
  }
}
