import { ParkingLot } from 'src/parking-lot/entities/parking-lot.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ParkingSpot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  parkingLotId!: string;

  @Column({ nullable: true })
  bookingId?: string;

  @ManyToOne(() => ParkingLot)
  @JoinColumn({ name: 'parkingLotId' })
  parkingLot!: ParkingLot;
}
