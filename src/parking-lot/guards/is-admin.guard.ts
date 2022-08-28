import { ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbstractIsAuthorized } from 'src/shared/guards/is-creator.guard';

import { ParkingLotService } from '../parking-lot.service';

export class IsAdminGuard extends AbstractIsAuthorized {
  constructor(
    @Inject(ParkingLotService)
    private readonly parkingLotService: ParkingLotService,
    private reflector: Reflector,
  ) {
    super();
  }
  async validate(request: any, context: ExecutionContext): Promise<boolean> {
    const _id = this.reflector.get('ID', context.getHandler()) || 'id';
    console.log(_id);

    const id = request.params[_id];
    if (!id) throw Error(`key ${_id} is not found.`);
    const parkingLot = await this.parkingLotService.findOne(id);
    return parkingLot.adminId === request.user.id;
  }
}
