import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import * as cryptoServer from 'crypto';
import { Cinema } from '../../cinema/entities/cinema.entity';

@Entity()
export default class User {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  type: 'ADM' | 'OPR' | 'PRP';
  @OneToMany(() => Cinema, (cinema) => cinema.user)
  cinemas: Cinema[];

  constructor(
    props: {
      name: string;
      email: string;
      password: string;
      type: 'ADM' | 'OPR' | 'PRP';
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? cryptoServer.randomUUID();
  }
}
