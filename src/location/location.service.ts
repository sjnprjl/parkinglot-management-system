import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}
  async findOneOrThrow(id: string) {
    const location = await this.locationRepository.findOne({ where: { id } });
    if (!location)
      throw new BadRequestException('location could not be found.');
    return location;
  }

  async findOneById(id: string) {
    const location = await this.findOneOrThrow(id);
    return location;
  }
  async find(limit = 10, offset = 0) {
    return await this.locationRepository.find({ take: limit, skip: offset });
  }

  async create(createLocationDto: CreateLocationDto) {
    try {
      return await this.locationRepository.save(createLocationDto);
    } catch (err) {
      const UNIQUE_CONSTRAINT_ERROR = '23505';
      if (err.driverError.code === UNIQUE_CONSTRAINT_ERROR)
        throw new BadRequestException('same location already exist');
    }
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const updated = await this.locationRepository.update(id, updateLocationDto);
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.locationRepository.delete(id);
    return deleted;
  }
}
