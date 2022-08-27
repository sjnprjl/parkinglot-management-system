import { PartialType } from '@nestjs/mapped-types';
import { CreateParkingSpotTypeDto } from './create-parking-type.dto';

export class UpdateParkingTypeDto extends PartialType(
  CreateParkingSpotTypeDto,
) {}
