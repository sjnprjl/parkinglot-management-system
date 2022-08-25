import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from '../../location/entities/location.entity';

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

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'locationId' })
  location: Location;
}
