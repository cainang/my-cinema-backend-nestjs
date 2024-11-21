import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import * as cryptoServer from 'crypto';
import { Cinema } from '../../cinema/entities/cinema.entity';
import { Session } from '../../sessions/entities/session.entity';

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
  @OneToMany(() => Session, (session) => session.room)
  sessions: Session[];

  constructor(
    props: {
      name: string;

      maxCapacity: number;
    },
    id?: string,
    capacity?: number,
  ) {
    Object.assign(this, props);
    this.id = id ?? cryptoServer.randomUUID();
    this.capacity = capacity ?? 0;
  }
}
