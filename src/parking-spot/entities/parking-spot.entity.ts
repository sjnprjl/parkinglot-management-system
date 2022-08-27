import { ParkingLot } from 'src/parking-lot/entities/parking-lot.entity';
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class ParkingSpot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  parkingLotId: keyof ParkingLot['id'];

  @ManyToOne(() => ParkingLot)
  @JoinColumn({ name: 'parkingLotId' })
  parkingLot: ParkingLot;
}
