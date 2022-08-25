import { Inject, Injectable } from '@nestjs/common';
import { AbstractIsCreator } from 'src/shared/guards/is-creator.guard';

import { ParkingLotService } from '../parking-lot.service';

@Injectable()
export class IsAdmin extends AbstractIsCreator {
  parkingLotId: string;
  constructor(
    @Inject(ParkingLotService)
    private readonly parkingLotService: ParkingLotService,
  ) {
    super();
  }
  async validate(request: any): Promise<boolean> {
    if (request?.params?.id) {
      const { id } = request.params;
      const parkingLot = await this.parkingLotService.findOne(id);
      return parkingLot.adminId === request.user.id;
    }
    return Promise.resolve(false);
  }
}
