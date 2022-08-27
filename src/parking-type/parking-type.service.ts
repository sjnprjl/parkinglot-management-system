import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateParkingTypeDto } from './dto/create-parking-type.dto';
import { UpdateParkingTypeDto } from './dto/update-parking-type.dto';
import { ParkingType } from './entities/parking-type.entity';

@Injectable()
export class ParkingTypeService {
  constructor(
    @InjectRepository(ParkingType)
    private readonly parkingTypeRepo: Repository<ParkingType>,
  ) {}

  private async findOneOrThrow(id: string) {
    const type = await this.parkingTypeRepo.findOne({ where: { id } });
    if (!type) throw new BadRequestException('parking type not found.');
    return type;
  }

  async findOne(id: string) {
    return await this.findOneOrThrow(id);
  }

  async findAll(limit = 10, offset = 0) {
    return await this.parkingTypeRepo.find({
      skip: offset,
      take: limit,
    });
  }

  async create(createParkingTypeDto: CreateParkingTypeDto) {
    return await this.parkingTypeRepo.save(createParkingTypeDto);
  }

  async update(id: string, updateParkingTypeDto: UpdateParkingTypeDto) {
    return await this.parkingTypeRepo.update(id, updateParkingTypeDto);
  }
}
