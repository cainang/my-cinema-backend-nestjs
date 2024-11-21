import * as cryptoServer from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';
import { Film } from '../../films/entities/film.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity()
export class Session {
  @PrimaryColumn()
  id: string;
  @Column()
  openHour: string;
  @Column()
  closeHour: string;
  @Column({ type: 'timestamptz' })
  date: string;
  @Column('decimal', { precision: 6, scale: 2 })
  price: number;

  @ManyToOne(() => Room, (room) => room.sessions)
  room: Room;

  @OneToOne(() => Film)
  @JoinColumn()
  film: Film;

  @OneToMany(() => Ticket, (ticket) => ticket.session)
  tickets: Ticket[];

  constructor(
    props: {
      openHour: string;
      closeHour: string;
      date: string;
      price: number;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? cryptoServer.randomUUID();
  }
}
