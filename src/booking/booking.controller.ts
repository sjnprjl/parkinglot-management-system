import {
  Body,
  Controller,
  Get,
  ParseEnumPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@UseGuards(JwtAuthGuard)
@Controller('/bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @Post()
  creat(@Body() input: CreateBookingDto, @GetUser('id') userId: string) {
    return this.bookingService.create(userId, input);
  }

  @Get()
  getBookings(
    @Query() { limit, offset, filter },
    @GetUser('id') userId: string,
  ) {
    return this.bookingService.find(limit, offset, filter, userId);
  }
}
