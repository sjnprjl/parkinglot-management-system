import { Module } from '@nestjs/common';
import { ParkingTypeService } from './parking-type.service';
import { ParkingTypeController } from './parking-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingType } from './entities/parking-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingType])],
  providers: [ParkingTypeService],
  controllers: [ParkingTypeController],
  exports: [ParkingTypeService],
})
export class ParkingTypeModule {}
