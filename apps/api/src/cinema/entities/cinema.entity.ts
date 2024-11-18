import * as cryptoServer from 'crypto';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import User from '../../users/entities/user.entity';

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
