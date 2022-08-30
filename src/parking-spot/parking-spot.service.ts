import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingLotParkingSpotType } from 'src/parking-lot/entities/parking-lot_parking-type.entity';
import { Repository } from 'typeorm';

import { CreateParkingSpotDto } from './dto/create-parking-spot.dto';
import { UpdateParkingSpotDto } from './dto/update-parking-spot.dto';
import { ParkingSpot } from './entities/parking-spot.entity';

@Injectable()
export class ParkingSpotService {
  constructor(
    @InjectRepository(ParkingSpot)
    private readonly parkingSpotRepo: Repository<ParkingSpot>,

    @InjectRepository(ParkingLotParkingSpotType)
    private readonly parkingLotParkingSpotTypeRepo: Repository<ParkingLotParkingSpotType>,
  ) {}

  async findOneOrThrow(id: string) {
    try {
      return await this.parkingSpotRepo.findOne({
        where: {
          id,
        },
        relations: {
          parkingSpotType: {
            parkingSpotType: true,
          },
        },
        select: {
          id: true,
          parkingLotId: true,
          parkingSpotType: {
            id: true,
            rate: true,
            parkingSpotType: {
              type: true,
            },
          },
        },
      });
    } catch (err) {
      throw new BadRequestException('could not find parking spot.');
    }
  }

  async findOne(id: string) {
    return await this.findOneOrThrow(id);
  }

  async findAll(parkingLotId?: string) {
    if (parkingLotId) {
      return await this.parkingSpotRepo.find({
        where: {
          parkingLotId,
        },

        relations: {
          parkingSpotType: {
            parkingSpotType: true,
          },
          booking: true,
        },
        select: {
          id: true,
          parkingLotId: true,
          booking: {
            id: true,
          },
          parkingSpotType: {
            id: true,
            rate: true,
            parkingSpotType: {
              type: true,
            },
          },
        },
      });
    }
    return await this.parkingSpotRepo.find();
  }

  async findSpotTypeFromParkingLot(parkingLotId: string, id: string) {
    const spot = await this.parkingLotParkingSpotTypeRepo.findOne({
      where: {
        id,
        parkingLotId,
      },
    });
    if (!spot) throw new BadRequestException('parking type not found');
    return spot;
  }

  async create(
    parkingLotId: string,
    createParkingSpotDto: CreateParkingSpotDto,
  ) {
    await this.findSpotTypeFromParkingLot(
      parkingLotId,
      createParkingSpotDto.parkingSpotTypeId,
    );
    return await this.parkingSpotRepo.save({
      ...createParkingSpotDto,
      parkingLotId,
    });
  }

  async update(
    id: string,
    parkingLotId: string,
    updateParkingSpotDto: UpdateParkingSpotDto,
  ) {
    await this.findSpotTypeFromParkingLot(
      parkingLotId,
      updateParkingSpotDto.parkingSpotTypeId,
    );
    return await this.parkingSpotRepo.update(id, updateParkingSpotDto);
  }

  async delete(id: string, parkingLotId: string) {
    return await this.parkingSpotRepo.delete({
      id,
      parkingLotId,
    });
  }
}
