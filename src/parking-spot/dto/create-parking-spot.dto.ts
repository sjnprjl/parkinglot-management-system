import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateParkingSpotDto {
  @IsUUID('4')
  parkingSpotTypeId!: string;

  @IsOptional()
  @IsUUID('4')
  bookingId?: string;
}
