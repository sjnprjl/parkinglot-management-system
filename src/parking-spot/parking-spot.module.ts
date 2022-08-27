import { Module } from '@nestjs/common';
import { ParkingLotModule } from 'src/parking-lot/parking-lot.module';
import { ParkingSpotController } from './parking-spot.controller';

@Module({
  imports: [ParkingLotModule],
  controllers: [ParkingSpotController],
})
export class ParkingSpotModule {}
