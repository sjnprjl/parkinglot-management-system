import { Test, TestingModule } from '@nestjs/testing';
import { ParkingTypeController } from './parking-type.controller';

describe('ParkingTypeController', () => {
  let controller: ParkingTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingTypeController],
    }).compile();

    controller = module.get<ParkingTypeController>(ParkingTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
