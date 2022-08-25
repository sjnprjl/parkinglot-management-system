import { Module } from '@nestjs/common';
import { ParkingLotService } from './parking-lot.service';
import { ParkingLotController } from './parking-lot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLot } from './entities/parking-lot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingLot])],
  providers: [ParkingLotService],
  controllers: [ParkingLotController],
})
export class ParkingLotModule {}
