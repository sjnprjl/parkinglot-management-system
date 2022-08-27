import { PartialType } from "@nestjs/mapped-types";
import { CreateParkingTypeDto } from "./create-parking-type.dto";

export class UpdateParkingTypeDto extends PartialType(CreateParkingTypeDto){}
