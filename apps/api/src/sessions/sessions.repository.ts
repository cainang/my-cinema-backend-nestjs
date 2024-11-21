import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';

export default interface ISessionsRepository {
  getAll(): Promise<Session[]>;
  get(id: string): Promise<Session | undefined>;
  getByRoom(id: string): Promise<Session[] | []>;
  getByFilm(id: string): Promise<Session[] | []>;
  create(sessionCreate: Session): Promise<Session>;
  edit(sessionUpdate: Session): Promise<Session>;
  delete(sessionDelete: Session): Promise<boolean>;
}

export class SessionsTypeOrmRepository implements ISessionsRepository {
  constructor(
    @InjectRepository(Session)
    private typeOrmRepo: Repository<Session>,
  ) {}

  async get(id: string): Promise<Session | undefined> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }
  async getByRoom(id: string): Promise<Session[] | []> {
    return this.typeOrmRepo.find({ where: { room: { id } } });
  }
  async getByFilm(id: string): Promise<Session[] | []> {
    return this.typeOrmRepo.find({ where: { film: { id } } });
  }
  async getAll(): Promise<Session[]> {
    return this.typeOrmRepo.find();
  }
  async edit(sessionUpdate: Session): Promise<Session> {
    return this.typeOrmRepo.save(sessionUpdate);
  }
  async create(sessionCreate: Session): Promise<Session> {
    return this.typeOrmRepo.save(sessionCreate);
  }
  async delete(sessionDelete: Session): Promise<boolean> {
    return (await this.typeOrmRepo.delete(sessionDelete)).affected > 0;
  }
}
