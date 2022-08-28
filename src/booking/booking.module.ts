import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpotModule } from 'src/parking-spot/parking-spot.module';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), ParkingSpotModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
