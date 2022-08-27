import { Exclude } from 'class-transformer';
import { ParkingType } from 'src/parking-type/entities/parking-type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParkingLot } from './parking-lot.entity';

@Entity()
export class ParkingLotParkingSpotType {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('decimal')
  rate!: number;

  @Exclude()
  @Column()
  parkingLotId!: string;

  @Exclude()
  @Column()
  parkingSpotTypeId!: string;

  @ManyToOne(() => ParkingLot)
  @JoinColumn({ name: 'parkingLotId' })
  parkingLot!: ParkingLot;

  @ManyToOne(() => ParkingType)
  @JoinColumn({
    name: 'parkingSpotTypeId',
  })
  parkingSpotType!: ParkingType;
}
