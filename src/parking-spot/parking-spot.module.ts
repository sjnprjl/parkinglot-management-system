import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLotParkingSpotType } from 'src/parking-lot/entities/parking-lot_parking-type.entity';
import { ParkingLotModule } from 'src/parking-lot/parking-lot.module';
import { ParkingSpot } from './entities/parking-spot.entity';
import { ParkingSpotController } from './parking-spot.controller';
import { ParkingSpotService } from './parking-spot.service';

@Module({
  imports: [
    ParkingLotModule,
    TypeOrmModule.forFeature([ParkingSpot, ParkingLotParkingSpotType]),
  ],
  controllers: [ParkingSpotController],
  providers: [ParkingSpotService],
})
export class ParkingSpotModule {}
