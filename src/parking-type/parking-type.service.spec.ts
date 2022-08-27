import { Test, TestingModule } from '@nestjs/testing';
import { ParkingTypeService } from './parking-type.service';

describe('ParkingTypeService', () => {
  let service: ParkingTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingTypeService],
    }).compile();

    service = module.get<ParkingTypeService>(ParkingTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
