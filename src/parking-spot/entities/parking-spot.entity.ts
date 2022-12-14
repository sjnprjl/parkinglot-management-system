import { Booking } from 'src/booking/entities/booking.entity';
import { ParkingLot } from 'src/parking-lot/entities/parking-lot.entity';
import { ParkingLotParkingSpotType } from 'src/parking-lot/entities/parking-lot_parking-type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ParkingSpot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  parkingLotId!: string;

  @Column()
  parkingSpotTypeId: string;

  @ManyToOne(() => ParkingLotParkingSpotType)
  @JoinColumn({
    name: 'parkingSpotTypeId',
  })
  parkingSpotType: ParkingLotParkingSpotType;

  @ManyToOne(() => ParkingLot, (parkingLot) => parkingLot.parkingSpots)
  @JoinColumn({ name: 'parkingLotId' })
  parkingLot!: ParkingLot;

  @OneToOne(() => Booking, (booking) => booking.parkingSpot)
  booking: Booking;
}
