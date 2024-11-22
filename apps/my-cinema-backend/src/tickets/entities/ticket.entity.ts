import { Column, Entity, PrimaryColumn } from 'typeorm';
import * as cryptoServer from 'crypto';

@Entity()
export class Ticket {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column({ default: false })
  used: boolean;
  @Column()
  email: string;

  constructor(
    props: {
      name: string;
      used: boolean;
      email: string;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? cryptoServer.randomUUID();
  }
}
