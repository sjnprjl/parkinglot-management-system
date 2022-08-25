import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateParkingLotDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID('4')
  locationId: string;

  @IsUUID('4')
  @IsOptional()
  adminId: string;
}
