import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from '../../location/entities/location.entity';
import { ParkingLotParkingSpotType } from './parking-lot_parking-type.entity';

@Entity()
export class ParkingLot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  adminId: string;

  @Column()
  locationId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'adminId' })
  admin: User;

  @OneToMany(() => ParkingLotParkingSpotType, (parkingLotParkingSpotType) => parkingLotParkingSpotType.parkingLot)
  parkingLotParkingSpotType: ParkingLotParkingSpotType[];

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'locationId' })
  location: Location;
}
