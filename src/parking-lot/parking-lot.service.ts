import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateParkingLotDto } from './dto/create-parking-lot.dto';
import { UpdateParkingLotDto } from './dto/update-parking-lot.dto';
import { ParkingLot } from './entities/parking-lot.entity';

@Injectable()
export class ParkingLotService {
  constructor(
    @InjectRepository(ParkingLot)
    private readonly parkingLotRepository: Repository<ParkingLot>,
  ) {}

  async find(limit = 10, offset = 0) {
    const [value, count] = await this.parkingLotRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: { location: true },
      select: {
        id: true,
        location: { location: true },
      },
    });
    return { count, value };
  }

  private async findOneOrThrow(id: string) {
    const parkingLot = await this.parkingLotRepository.findOne({
      where: { id },
      relations: {
        location: true,
        parkingSpots: {
          parkingSpotType: {
            parkingSpotType: true,
          },
        },
      },
      select: {
        id: true,
        location: {
          location: true,
        },
        name: true,
        parkingSpots: {
          id: true,
          bookingId: true,
          parkingSpotType: {
            rate: true,
            parkingSpotType: {
              type: true,
            },
          },
        },
      },
    });

    if (!parkingLot)
      throw new BadRequestException('parking lot could not be found.');
    return parkingLot;
  }

  async findOne(id: string) {
    return await this.findOneOrThrow(id);
  }

  async create(createParkingLotDto: CreateParkingLotDto) {
    try {
      const parkingLot = await this.parkingLotRepository.save(
        createParkingLotDto,
      );
      return parkingLot;
    } catch (e) {
      throw new InternalServerErrorException(
        'Unexpected error has occured.',
        'The possible explaination about this error is that the given `location id` is invalid or `admin id`, if you have passed any, is not valid either.',
      );
    }
  }

  async update(id: string, updateParkingLotDto: UpdateParkingLotDto) {
    return await this.parkingLotRepository.update(id, updateParkingLotDto);
  }

  async delete(id: string) {
    return await this.parkingLotRepository.delete(id);
  }
}
