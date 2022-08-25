import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

import { Location } from './entities/location.entity';
import { LocationService } from './location.service';

const locations = [
  plainToClass(Location, {
    id: uuidv4(),
    location: 'kathmandu',
  }),
];

const findOne = (id: string) => {
  const location = locations.find((loc) => loc.id === id);
  return location;
};

describe('LocationService', () => {
  let service: LocationService;
  const mockRepo = {
    findOne: jest.fn(
      ({ where: { id } }: any) =>
        new Promise((resolve, _) => {
          return resolve(findOne(id));
        }),
    ),
    save: jest.fn(({ location }: any) => {
      const l = new Location();
      l.id = uuidv4();
      l.location = location;
      if (locations.find((loc) => loc.location === l.location)) {
        throw {
          driverError: {
            code: '23505',
          },
        };
      }
      locations.push(l);
      return Promise.resolve(l);
    }),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getRepositoryToken(Location),
          useValue: mockRepo,
        },
      ],
    }).compile();
    service = moduleRef.get<LocationService>(LocationService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('findOne', () => {
    it('should return object', () => {
      expect(findOne(locations[0].id)).toEqual(locations[0]);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should get one location', async () => {
    const location = await service.findOneById(locations[0].id);
    expect(location).toBeDefined();
    expect(location).toEqual(locations[0]);
  });
  it('should throw error when location is not found', async () => {
    try {
      await service.findOneById(uuidv4());
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toBe('location could not be found.');
    }
  });
  it('should save and return new location', async () => {
    const location = await service.create({ location: 'ktm' });
    expect(location).toEqual(locations.at(-1));
  });
  it('should throw already exist exception', async () => {
    try {
      await service.create({ location: 'kathmandu' });
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toBe('same location already exist');
    }
  });
});
