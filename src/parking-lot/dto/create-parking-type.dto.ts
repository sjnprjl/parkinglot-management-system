import { IsNumber, IsUUID, Min } from 'class-validator';

export class CreateParkingSpotTypeDto {
  @IsNumber()
  @Min(0)
  rate: number;

  @IsUUID('4')
  parkingSpotTypeId: string;
}
