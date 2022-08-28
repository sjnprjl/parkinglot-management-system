import { ParkingSpot } from 'src/parking-spot/entities/parking-spot.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum BookingStatus {
  success = 'success',
  pending = 'pending',
  failed = 'failed',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() userId: string;

  @Column('decimal') amount: number;

  @Column({ type: 'timestamp' }) time: Date;

  @Column()
  hour: number;

  @Column()
  parkingSpotId: string;

  @Column({ enum: BookingStatus, default: BookingStatus.pending })
  status: BookingStatus;

  @Column({ type: 'text', default: 'your booking is in pending state' })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => ParkingSpot)
  @JoinColumn({ name: 'parkingSpotId' })
  parkingSpot: ParkingSpot;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
