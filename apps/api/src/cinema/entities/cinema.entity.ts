import * as cryptoServer from 'crypto';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import User from '../../users/entities/user.entity';
import { Room } from '../../rooms/entities/room.entity';

@Entity()
export class Cinema {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  location: string;
  @ManyToOne(() => User, (user) => user.cinemas)
  user: User;
  @OneToMany(() => Room, (room) => room.cinema)
  rooms: Room[];

  constructor(
    props: {
      name: string;
      location: string;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? cryptoServer.randomUUID();
  }
}
