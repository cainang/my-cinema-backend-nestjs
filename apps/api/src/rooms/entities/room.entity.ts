import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import * as cryptoServer from 'crypto';
import { Cinema } from '../../cinema/entities/cinema.entity';

@Entity()
export class Room {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column({ default: 0 })
  capacity: number;
  @Column()
  maxCapacity: number;
  @ManyToOne(() => Cinema, (cinema) => cinema.rooms)
  cinema: Cinema;

  constructor(
    props: {
      name: string;
      capacity: number;
      maxCapacity: number;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? cryptoServer.randomUUID();
  }
}
