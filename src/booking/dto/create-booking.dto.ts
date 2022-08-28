import { IsDateString, IsUUID } from "class-validator";

export class CreateBookingDto {
	@IsUUID('4')
	parkingSpotId: string;

	@IsDateString()
	time: string;

}
