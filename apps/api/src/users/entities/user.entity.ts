import { Column, Entity, PrimaryColumn } from 'typeorm';
import * as cryptoServer from 'crypto';

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
