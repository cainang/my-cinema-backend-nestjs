import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import * as cryptoServer from 'crypto';
import { Session } from '../../sessions/entities/session.entity';

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

  @ManyToOne(() => Session, (session) => session.tickets)
  session: Session;

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
