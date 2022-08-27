import { Module } from '@nestjs/common';
import { ParkingLotService } from './parking-lot.service';
import { ParkingLotController } from './parking-lot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLot } from './entities/parking-lot.entity';
import { IsAdminGuard } from './guards/is-admin.guard';
import { ParkingLotParkingSpotType } from './entities/parking-lot_parking-type.entity';
import { ParkingTypeModule } from 'src/parking-type/parking-type.module';

@Module({
  imports: [ParkingTypeModule, TypeOrmModule.forFeature([ParkingLot, ParkingLotParkingSpotType])],
  providers: [ParkingLotService, IsAdminGuard],
  controllers: [ParkingLotController],
  exports: [IsAdminGuard, ParkingLotService],
})
export class ParkingLotModule {}
