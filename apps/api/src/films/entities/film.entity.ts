import { Column, Entity, PrimaryColumn } from 'typeorm';
import * as cryptoServer from 'crypto';

@Entity()
export class Film {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  category: string;
  @Column()
  timeDuration: string;

  constructor(
    props: {
      name: string;
      category: string;
      timeDuration: string;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? cryptoServer.randomUUID();
  }
}
