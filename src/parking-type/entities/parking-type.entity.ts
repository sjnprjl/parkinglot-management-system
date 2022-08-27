import { ParkingLotParkingSpotType } from 'src/parking-lot/entities/parking-lot_parking-type.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ParkingType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @OneToMany(
    () => ParkingLotParkingSpotType,
    (parkingLotParkingSpotType) => parkingLotParkingSpotType.parkingSpotType,
  )
  parkingLotParkingSpotType: ParkingLotParkingSpotType[];
}
