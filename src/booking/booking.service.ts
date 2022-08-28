import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSpotService } from 'src/parking-spot/parking-spot.service';
import { dateDiffInHours } from 'src/shared/utils/date-difference';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking, BookingStatus } from './entities/booking.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    private readonly parkingSpotService: ParkingSpotService,
  ) {}

  async find(limit = 10, offset = 0, filter = null, userId: string) {
    if (!BookingStatus[filter])
      throw new BadRequestException('not a valid filter value.');
    return await this.bookingRepository.find({
      where: {
        userId,
        status: BookingStatus[filter],
      },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    const one = await this.bookingRepository.findOne({ where: { id } });
    return one;
  }

  private async calculateTotalParkingCharge({
    parkingTime,
    parkingSpotId,
  }: {
    parkingTime: Date;
    parkingSpotId: string;
  }) {
    const {
      parkingSpotType: { rate },
    } = await this.parkingSpotService.findOne(parkingSpotId);
    const netHour = dateDiffInHours(new Date(), parkingTime);
    return { netHour, amount: netHour * rate };
  }

  async create(userId: string, input: CreateBookingDto) {
    const hasParkingSpotBook = await this.bookingRepository.findOne({
      where: {
        parkingSpotId: input.parkingSpotId,
      },
    });
    if (hasParkingSpotBook)
      throw new BadRequestException('parking spot has already been booked.');
    const { amount, netHour: hour } = await this.calculateTotalParkingCharge({
      parkingTime: new Date(input.time),
      parkingSpotId: input.parkingSpotId,
    });
    return await this.bookingRepository.save({
      userId,
      ...input,
      amount,
      hour,
    });
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async deletePendingBookings() {
    const pendingBookings = await this.bookingRepository.find({
      where: {
        status: BookingStatus.pending,
      },
    });
    pendingBookings.map(async (booking) => {
      const HOUR_LIMIT = 1;
      const diff = dateDiffInHours(booking.createdAt, new Date());
      if (diff >= HOUR_LIMIT) await this.bookingRepository.delete(booking.id);
    });
  }
}
