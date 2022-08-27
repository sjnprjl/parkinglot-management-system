import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingSpot } from './entities/parking-spot.entity';

@Injectable()
export class ParkingSpotService {
  constructor(
    @InjectRepository(ParkingSpot)
    private readonly parkingSpotRepo: Repository<ParkingSpot>,
  ) {}

  async findOneOrThrow(id: string) {
    try {
      return await this.parkingSpotRepo.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new BadRequestException('could not find parking spot.');
    }
  }

  async findAll() {
    return await this.parkingSpotRepo.find();
  }
}
