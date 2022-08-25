import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

describe('LocationController', () => {
  let locationController: LocationController;

  let mockLocationService = {};
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        {
          provide: LocationService,
          useValue: mockLocationService,
        },
      ],
    }).compile();

    locationController = moduleRef.get<LocationController>(LocationController);
  });


  it('should be defined ', () => {
    expect(locationController).toBeDefined();
  });
});
