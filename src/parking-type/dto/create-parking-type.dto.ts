import { IsString } from 'class-validator';

export class CreateParkingTypeDto {
  @IsString()
  type: string;
}
